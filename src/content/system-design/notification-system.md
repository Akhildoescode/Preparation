## Problem Statement

Design a notification system that delivers messages to users across multiple channels — push notifications (iOS/Android), email, and SMS — triggered by application events. The system must handle high-volume fan-out (e.g., notifying all subscribers of a popular creator's new post), guarantee at-least-once delivery, and respect user preferences for notification types and quiet hours. Target scale: 1 billion notifications per day across all channels, with push notifications delivered within 5 seconds of the triggering event.

## Clarifying Questions

- Which notification channels must be supported at launch — push (APNs/FCM), email, SMS, in-app — and can different events route to different channels?
- What is the delivery guarantee requirement — at-least-once (acceptable duplicates) or exactly-once (requires deduplication), and how do we handle delivery failures?
- Must users be able to configure per-notification-type preferences (e.g., no email for likes, only push for mentions), and how are preferences stored and updated?
- What is the fan-out factor for the largest events — does a single notification need to reach 10M+ subscribers in under a second?
- Do we need delivery receipts (read receipts, open tracking), and if so, at what granularity and retention?

## Scale Estimates

**Daily volume:**
- 1B notifications/day ÷ 86,400 s ≈ **11,600 notifications/sec** average
- Peak (major event, 10× average): **116,000 notifications/sec**

**Channel breakdown (typical):**
- Push (FCM/APNs): 70% → ~8,100/sec average, 81,000/sec peak
- Email: 20% → ~2,300/sec
- SMS: 10% → ~1,160/sec (most expensive per unit)

**Fan-out for a viral event:**
- Creator with 50M subscribers posts → 50M push notifications must be queued in seconds
- 50M ÷ 5 seconds delivery window = **10M queue writes/sec** for that burst

**Storage:**
- Notification log: 1B/day × 200 bytes = 200 GB/day → store 90 days = 18 TB (for delivery tracking)
- User preference store: 100M users × 500 bytes = 50 GB — fits in a Redis cluster

## High-Level Design

```
Application Event Source
    (like, comment, post)
         │
         ▼
┌────────────────────────┐
│  Notification Service  │
│  (event → preference   │
│   check → routing)     │
└─────────┬──────────────┘
          │ enqueue per channel
    ┌─────┴──────────────────────────────┐
    ▼             ▼                      ▼
┌────────┐  ┌─────────┐          ┌────────────┐
│ Push   │  │  Email  │          │  SMS Queue │
│ Queue  │  │  Queue  │          │  (Kafka)   │
│(Kafka) │  │ (Kafka) │          └─────┬──────┘
└───┬────┘  └────┬────┘                │
    │             │              ┌──────┴──────┐
    ▼             ▼              │  SMS Worker  │
┌────────────┐ ┌────────────┐   │  (Twilio)   │
│ Push Worker│ │Email Worker│   └─────────────┘
│ (FCM/APNs) │ │(SendGrid/  │
└────────────┘ │ SES)       │
               └────────────┘
         │
         ▼
┌────────────────────────┐
│  User Preference DB    │
│  (Redis + Postgres)    │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│  Delivery Log          │
│  (Cassandra)           │
└────────────────────────┘
```

**Notification Service:** The entry point for all application events. It looks up the target user's notification preferences (Redis cache), determines which channels to use, and enqueues one message per channel to the appropriate Kafka topic. This is fast and stateless — the heavy lifting is in the workers.

**Kafka (per-channel topics):** Decouples event generation from delivery. A single push_notifications topic with hundreds of partitions handles 100K+ messages/sec. Kafka's durable log means messages are not lost even if workers are slow or restarting.

**Push Workers (FCM/APNs):** Consume from the push Kafka topic, batch requests to FCM/APNs (both support batch send APIs of up to 500 tokens per request), and write delivery status to Cassandra. FCM (Firebase Cloud Messaging) handles Android; APNs handles iOS.

**Email/SMS Workers:** Similar pattern — consume from their respective queues and call third-party providers (SendGrid for email, Twilio for SMS). Rate limits imposed by providers are respected by controlling worker concurrency and using provider-side retry callbacks.

**User Preference DB:** Redis for fast lookups (hot preferences), Postgres as the source of truth. Preferences include: per-type channel overrides, quiet hours, language, and device tokens (a user may have multiple registered devices).

## Deep Dives

- **Fan-out for high-follower creators:** Naively queuing 50M push notifications in a single Notification Service call blocks the event loop. Instead, the service enqueues a single "fan-out job" (`{creator_id, post_id, notification_template}`) to a fan-out Kafka topic. Dedicated fan-out workers read from the social graph service in pages of 10,000 followers and enqueue individual push messages to the push topic. This distributes the 50M → 50M individual enqueue operations across many workers without blocking the original event producer.

- **At-least-once delivery and deduplication:** Kafka's consumer-group offset commit after successful delivery provides at-least-once semantics — if a worker crashes after sending but before committing, the message is redelivered. Deduplication is handled at the push provider level (FCM and APNs both accept an idempotency key — include `notification_id` in the delivery request; the provider drops duplicates). For email, use a delivered-flag in Cassandra: workers check-then-insert before calling SendGrid.

- **Quiet hours and timezone-aware delivery:** Users may set quiet hours (e.g., 10 PM–8 AM local time). The Notification Service computes the user's current local time from their stored timezone and, if they're in quiet hours, schedules the notification in a delayed queue (Redis sorted set scored by `delivery_timestamp`). A scheduler process polls the delayed queue and moves due notifications back into the active Kafka pipeline. This avoids waking users at 3 AM with a notification about someone liking their photo.

- **Device token management and stale tokens:** Device tokens (FCM registration tokens) expire or change when a user reinstalls the app or revokes permissions. FCM returns an `INVALID_REGISTRATION` error for stale tokens. The push worker must handle this response by deleting the stale token from the user's device list in the preference DB, preventing wasted sends. A background job should also periodically validate all tokens against FCM's token validity API.

## Trade-offs

**Decision 1: Push fan-out at write time vs. pull at read time**

*Option A: Fan-out at write time (push model — enqueue individual notifications)*
- Pro: Notifications are delivered immediately and in parallel to all subscribers — lowest latency to delivery.
- Pro: Delivery is decoupled from the reader's app session — notifications arrive even when the app is closed.
- Con: Write amplification is extreme for viral creators — 50M followers = 50M individual queue messages.
- Con: Storage and queue processing costs scale with follower count, not reader count.

*Option B: Fan-out at read time (pull model — client polls for new notifications)*
- Pro: No write amplification — creator posts generate one record regardless of follower count.
- Pro: Fresh at read time — user sees the current notification state when they open the app.
- Con: Requires the app to be active and polling — cannot deliver push to a closed app without some push trigger.
- Con: High read load during app opens if millions of users open the app simultaneously after a viral event.

**Decision 2: Third-party delivery providers vs. direct SMTP/APNS integration**

*Option A: Third-party providers (SendGrid, Twilio, FCM)*
- Pro: Providers handle deliverability, reputation management, unsubscribe compliance, and carrier relationships.
- Pro: Faster time to market — no need to manage your own mail server infrastructure or carrier contracts.
- Con: Per-notification cost at high scale is significant (SendGrid charges per email; Twilio per SMS).
- Con: Provider outages become your outages — mitigate with multi-provider routing.

*Option B: Direct integration (self-hosted SMTP + direct APNs/FCM)*
- Pro: Lower per-unit cost at extreme scale (billions of emails/day where provider pricing becomes prohibitive).
- Pro: Full control over retry policies, headers, and delivery debugging.
- Con: Managing email server reputation (SPF/DKIM/DMARC, IP warm-up, blacklist monitoring) is a full-time job.
- Con: Direct carrier integrations for SMS in 200+ countries require individual carrier agreements.

## Google Angle

Firebase Cloud Messaging (FCM), owned by Google, is the notification delivery infrastructure used in this design — it handles over 100 billion messages per day for third-party apps and Google's own services. FCM solved the fan-out problem by batching device tokens in its upstream protocol (HTTP v1 API supports up to 500 recipients per request) and using a persistent connection per device maintained by Google Play Services to minimize battery drain. Google's own notification infrastructure for Gmail, Calendar, and Google Chat uses Pub/Sub (Cloud Pub/Sub) as the Kafka equivalent for event routing — the same decoupled publish-subscribe model that the notification system above relies on. This means the architecture in this design is essentially a simplified version of what Google uses internally, with FCM and Pub/Sub as the delivery and routing primitives.

## Key Numbers to Remember

- FCM/APNs batch size: up to 500 device tokens per API request — always batch, never send one at a time.
- Delivery latency SLA for push: 5 seconds from event to notification delivery on device.
- Fan-out amplification: 50M followers × 1 notification = 50M queue messages — always use a dedicated fan-out worker, not inline processing.
- Kafka push topic throughput: with 100 partitions, handles ~100K messages/sec comfortably with consumer group workers.
- Stale FCM token handling: `INVALID_REGISTRATION` response → delete token immediately, do not retry.
- Quiet hours scheduler: use Redis sorted sets scored by delivery timestamp for efficient dequeue of ready notifications.
