## Problem Statement

Design a video streaming platform similar to YouTube that allows users to upload videos, which are then processed, stored, and streamed on demand to viewers worldwide. The platform must support videos of varying lengths and qualities, deliver smooth playback with adaptive bitrate streaming, and scale to billions of daily video views. Target scale: 500 hours of video uploaded per minute, 2 billion monthly active users, 1 billion hours of video watched per day.

## Clarifying Questions

- What is the maximum supported video length and file size per upload, and should there be limits for different account tiers?
- What video qualities must be supported (360p through 4K), and should the platform generate all variants or allow uploaders to specify target qualities?
- What is the content delivery latency requirement — acceptable buffering within 2 seconds of pressing play, or must the first frame appear within 500 ms?
- Do we need to support live streaming in addition to on-demand video, or is this design scoped to pre-recorded content only?
- What are the content moderation requirements — automatic scanning for policy violations at upload time, or human review queues?

## Scale Estimates

**Upload volume:**
- 500 hours of video/min = 500 × 60 s = 30,000 video-seconds/min ÷ 60 = **500 video-seconds/sec** ingested
- Average upload size: 1 GB per 10 minutes → 500 video-sec/sec × (1 GB ÷ 600 s) ≈ **833 MB/s** raw upload throughput

**Transcoding:**
- Each uploaded video is transcoded into 5 quality tiers (360p, 480p, 720p, 1080p, 4K)
- Transcoding is CPU-intensive: 1 min of video at 1080p takes ~2 min of CPU time (0.5× real-time)
- 500 video-seconds/sec × 5 tiers × 2× CPU ratio = **5,000 CPU-seconds of transcoding per second** → requires ~5,000 CPU cores continuously

**Storage:**
- 500 hr/min × 60 min/hr × 1 GB/10 min = 3,000 GB/min raw upload
- With 5 quality tiers and compression, total storage ≈ 3× raw: **9 TB/minute** = 540 TB/hr ≈ **13 PB/day**
- After 10 years: hundreds of exabytes — pure object storage (GCS, S3) at tier-based pricing

**Streaming (playback):**
- 1B hours/day ÷ 86,400 s = **11.6M concurrent viewers** on average
- Assume 720p streaming: ~2.5 Mbps → 11.6M × 2.5 Mbps = **29 Tbps** aggregate egress bandwidth → only feasible via a global CDN

## High-Level Design

```
Uploader
  │ HTTP multipart upload
  ▼
┌────────────────────────┐
│  Upload Service        │
│  (chunked upload to    │
│   raw blob store)      │
└─────────┬──────────────┘
          │ upload complete event
          ▼
┌─────────────────────────────┐
│  Message Queue (Pub/Sub)    │
│  transcoding job queue      │
└────────────┬────────────────┘
             │
             ▼
┌────────────────────────────────────────┐
│  Transcoding Workers (auto-scaling)    │
│  - decode input video                  │
│  - encode 5 quality tiers              │
│  - split into 10-second HLS segments   │
│  - write segments to CDN origin        │
└────────────────────────┬───────────────┘
                         │
                         ▼
                ┌─────────────────────┐
                │  CDN Origin Store   │
                │  (GCS/S3 + CDN)     │
                │  HLS/DASH segments  │
                └─────────┬───────────┘
                          │ edge replication
                          ▼
                ┌─────────────────────┐
                │  CDN Edge PoPs      │
                │  (100+ global)      │
                └─────────┬───────────┘
                          │ segment fetch
                          ▼
                       Viewer
                       (HLS player)
```

**Upload Service:** Accepts chunked uploads (5–10 MB chunks) using resumable upload protocol. Each chunk is written to object storage. The service tracks chunk receipt state so uploads can be resumed after connection drops. On completion, publishes a transcoding job to the queue.

**Transcoding Workers:** Auto-scaling pool (thousands at peak). Each worker picks a job, downloads the raw video from object storage, transcodes all 5 quality tiers in parallel (using ffmpeg or libavcodec), splits each tier into 10-second HLS (HTTP Live Streaming) segments, generates a master `.m3u8` playlist, and uploads all segments to the CDN origin.

**CDN Origin Store:** Object storage (GCS) acting as the authoritative source of video segments. The CDN pulls segments from origin on first request from each PoP and caches them at the edge indefinitely (segments are immutable once written).

**CDN Edge PoPs:** Over 100 global Points of Presence serve video segments from local cache. The player requests segments from the nearest PoP; the PoP fetches from origin on cache miss. This reduces origin load to ~1% of total playback requests for popular videos.

**HLS Player (Viewer):** Fetches the master playlist, selects the appropriate quality tier based on measured bandwidth, and downloads 10-second segments ahead of playback. The player automatically switches quality tiers (adaptive bitrate / ABR) when bandwidth fluctuates.

## Deep Dives

- **Adaptive bitrate (ABR) streaming mechanics:** The HLS player maintains a bandwidth estimate using the download time of recent segments. If the last segment (10 seconds of video at 1 Mbps) downloaded in 2 seconds, estimated bandwidth is 5 Mbps — so it steps up to the 2.5 Mbps (720p) tier. If the next segment takes 8 seconds, it steps down. The segment-based design is crucial: quality can change at every 10-second boundary without interrupting playback. The player keeps a buffer of 3–5 segments ahead; as long as the buffer stays full, the viewer sees smooth playback even with momentary network drops.

- **Transcoding pipeline parallelization:** A 2-hour movie contains 720 10-second segments. Instead of one worker transcoding all 720 segments sequentially, the pipeline splits the video into 720 chunks, dispatches each to a separate worker (using a work-stealing queue), and reassembles the segments at the end. This reduces transcoding latency from hours to minutes for long videos. Scene-change detection runs in a preprocessing pass to ensure 10-second boundaries align with scene cuts, avoiding artifacts where a cut falls mid-segment.

- **Video deduplication for re-uploads:** When a user uploads a video that already exists (e.g., a copied movie clip), re-transcoding it wastes significant CPU. The platform computes a perceptual hash (pHash) of video frames during upload and compares against a fingerprint database. An exact match skips transcoding and re-uses the existing segments. Near-matches (same content, different encoding) are flagged for content ID matching (copyright enforcement). YouTube's ContentID system is the production implementation of this concept.

- **Cold vs. hot video tiered storage:** Popular videos (top 1% of views) account for 99% of traffic — they stay hot in CDN edge caches indefinitely. Videos that haven't been viewed in 30 days are "cold" — their CDN edge cache entries are evicted. On a cold video play, the player request triggers a CDN origin fetch (taking ~1–2 seconds longer to start). Videos not viewed in 1 year can have their transcoded segments moved to cold object storage (nearline/archive tier, 10× cheaper) and be re-transcoded on demand if ever requested again — acceptable since the re-transcoding takes a few minutes and occurs rarely.

## Trade-offs

**Decision 1: HLS vs. MPEG-DASH as streaming protocol**

*Option A: HLS (HTTP Live Streaming — Apple standard)*
- Pro: Native support on iOS and Safari without plugins; no additional licensing.
- Pro: Simplest to implement — pure HTTP segment requests, works with any CDN.
- Con: Segment sizes (10 seconds) mean 10 seconds of buffering lag before playback can begin at minimum.
- Con: Standard HLS does not support DRM (Widevine) natively — requires FairPlay DRM extension (Apple-only).

*Option B: MPEG-DASH (Dynamic Adaptive Streaming over HTTP — open standard)*
- Pro: Codec-agnostic, DRM-agnostic — works with Widevine, PlayReady, FairPlay through Common Encryption.
- Pro: Allows variable segment sizes (2–10 seconds), enabling lower startup latency with 2-second segments.
- Con: Not natively supported on iOS/Safari — requires Media Source Extensions (MSE) via a JavaScript player.
- Con: More complex playlist structure (MPD XML) vs. HLS's simpler M3U8 format.

**Decision 2: Synchronous vs. asynchronous transcoding with viewer notification**

*Option A: Asynchronous transcoding (queue-based, notify on completion)*
- Pro: Upload API returns immediately — uploader gets a confirmation without waiting for transcoding.
- Pro: Transcoding workers scale independently of the upload service.
- Con: Video is not available for viewing until transcoding completes — uploader must poll or wait for a notification.
- Con: Job queue failures can silently drop transcoding jobs if not monitored carefully; requires dead-letter queues.

*Option B: Synchronous transcoding (block upload API until done)*
- Pro: Simple for the uploader — upload completes and the video is immediately viewable.
- Pro: No separate job queue or notification system needed.
- Con: Upload API request is held open for minutes to hours for long videos — impractical for HTTP connections.
- Con: Any transcoding failure causes the upload API to return an error to the user — poor user experience for a 2-hour movie upload.

## Google Angle

YouTube, Google's video platform, is the largest video streaming platform in the world, handling over 500 hours of video uploaded per minute — the exact scale used in this design. YouTube uses Google Cloud Storage (GCS) as the CDN origin store and Google's global network (the same infrastructure as Google.com) as the CDN delivery layer, with PoPs in over 130 countries. YouTube's video transcoding pipeline runs on Google's internal cluster scheduler (Borg, the precursor to Kubernetes) with auto-scaling VM pools, exactly the transcoding worker architecture described above. YouTube's ContentID system implements the perceptual hashing deduplication described in the Deep Dives — it scans 800 years of video every day for copyright matches. YouTube also pioneered the use of VP9 and AV1 codecs (both Google-developed, royalty-free alternatives to H.265) to reduce streaming bandwidth costs by 30–50% compared to H.264 at the same quality level.

## Key Numbers to Remember

- Upload scale: 500 hours of video per minute — the canonical YouTube figure cited in every system design context.
- Transcoding CPU requirement: 5 quality tiers × 2× real-time CPU ratio = 10 CPU-seconds per video-second uploaded.
- HLS segment size: 10 seconds standard — player buffers 3–5 segments (30–50 seconds) ahead of playback.
- CDN cache ratio: top 1% of videos serve 99% of traffic — optimize CDN cache policy for the long tail, not the average.
- Storage growth: ~13 PB/day at YouTube scale — pure object storage (GCS/S3) is the only viable option.
- AV1 vs. H.264: AV1 achieves 30–50% smaller file size at equivalent quality — significant bandwidth cost savings at billion-user scale.
