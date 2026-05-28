## Problem Statement

Design the backend for a ride-sharing platform that matches riders requesting trips with nearby available drivers in real time. The system must track driver locations continuously, find the nearest available driver within seconds of a ride request, manage the lifecycle of a trip (requested → matched → in-progress → completed), and handle fare calculation. Target scale: 10 million active drivers worldwide, 5 million concurrent rides, 100,000 ride requests per minute at peak.

## Clarifying Questions

- What is the maximum acceptable time from ride request to driver match — 5 seconds? 10 seconds? What is the SLA for timeout/no-match?
- How frequently do drivers report their GPS location — every second? Every 5 seconds? This determines the location update ingestion volume.
- Should fare calculation be simple (distance × rate) or complex (surge pricing, traffic-adjusted ETAs, driver/rider ratings)?
- What geographic scope — single city, nationwide, or global — and does each region operate independently or is there a single global matching service?
- Do we need trip history, receipts, ratings, and driver payments in this design, or is the scope limited to real-time matching and trip management?

## Scale Estimates

**Location updates:**
- 10M active drivers × 1 GPS update/4 seconds = **2.5M location updates/sec**
- Each update: `{driver_id, lat, lng, timestamp, is_available}` ≈ 50 bytes
- 2.5M × 50 bytes = **125 MB/s** of location telemetry ingestion

**Ride requests:**
- 100,000 requests/minute ÷ 60 = **1,667 ride requests/sec**
- For each request: find drivers within radius R, sort by distance/ETA, attempt match — must complete in <5 sec

**Concurrent rides:**
- 5M concurrent rides × ~500 bytes state = **2.5 GB** of active trip state — fits in Redis

**Driver geo-index:**
- 10M drivers, each a lat/lng point
- Geohash at precision 6 (±0.6 km) → ~500K distinct cells globally; each cell holds ~20 drivers on average
- Redis GEOADD: one entry per driver, 8–16 bytes per entry = **160 MB** for the entire driver geo-index

## High-Level Design

```
Driver App                  Rider App
    │                           │
    │ WebSocket                 │ REST / WebSocket
    ▼                           ▼
┌──────────────────────┐ ┌───────────────────────┐
│  Driver Gateway      │ │  Rider Gateway         │
│  (location updates)  │ │  (trip requests)       │
└─────────┬────────────┘ └─────────┬─────────────┘
          │                         │
          ▼                         ▼
┌─────────────────────┐  ┌──────────────────────┐
│  Location Service   │  │  Trip Service         │
│  (Kafka ingest)     │  │  (matching, lifecycle)│
└─────────┬───────────┘  └─────────┬────────────┘
          │                         │
          ▼                         ▼
┌─────────────────────┐  ┌──────────────────────┐
│  Redis Geo Index    │  │  Redis Trip State    │
│  (GEOADD/GEORADIUS) │  │  + Postgres (trips)  │
└─────────────────────┘  └──────────────────────┘
          │
          ▼
┌──────────────────────┐
│  ETA Service         │
│  (Google Maps API /  │
│   routing engine)    │
└──────────────────────┘
```

**Driver Gateway:** Maintains a persistent WebSocket connection per active driver. Receives GPS updates every 4 seconds, publishes them to Kafka (`driver-location` topic). Also pushes ride offers to drivers over the same connection.

**Location Service:** Consumes from the Kafka `driver-location` topic and updates the Redis geo-index using `GEOADD drivers {lng} {lat} {driver_id}`. Maintains the `is_available` flag per driver in a Redis hash.

**Redis Geo Index:** Uses Redis's built-in Geo commands. `GEORADIUS drivers {lng} {lat} 5 km ASC COUNT 10` returns the 10 nearest available drivers within 5 km — O(N+log M) per query where N is result count. The entire global driver fleet fits in 160 MB of Redis memory.

**Trip Service:** On a ride request: (1) queries Redis for nearby available drivers; (2) calls ETA service for real ETAs; (3) ranks candidates; (4) offers the trip to the best driver via WebSocket; (5) waits for accept/decline; (6) if declined, offers to the next candidate. Creates a trip record in Postgres on match.

**ETA Service:** Uses a routing engine (Google Maps Distance Matrix API, or an internal road graph engine like OSRM) to compute real driving time from each candidate driver to the rider's pickup. Cached at coarse granularity (5-minute grid × traffic bucket) for popular routes.

## Deep Dives

- **Geohash vs. S2 cells for spatial indexing:** Redis GEORADIUS uses a simple Euclidean approximation that breaks near the poles and international date line — fine for most use cases. Uber's production system uses Google's S2 library (hierarchical spherical geometry cells) because S2 cells at level 12 (≈ 600m × 600m) provide uniform area globally and compose correctly across the dateline. S2 allows efficient range queries over a sorted cell ID space: find all level-12 cells within a given radius, then query the DB for drivers in those cell IDs. This makes the geo-index a standard sorted-set range scan rather than a special geo-data structure, enabling horizontal sharding by cell ID.

- **Driver matching and dispatch optimization:** Offering to the nearest driver first is locally optimal but globally suboptimal — it may leave a rider 800m away without a driver because the closest driver was pulled to another rider. Production systems use a short lookahead window (e.g., 2–3 seconds) during which all pending requests in a city block are batched and matched simultaneously using a bipartite graph matching algorithm (Hungarian algorithm or auction-based). This global optimum trades slightly more matching latency for significantly better driver utilization and reduced empty miles.

- **Handling network partitions and driver disconnects:** Drivers lose connectivity in tunnels, garages, and dead zones. The Driver Gateway maintains a heartbeat timeout (e.g., 10 seconds); if no GPS update is received, the driver is marked as temporarily unavailable in the geo-index. The driver's WebSocket is not cleaned up immediately — a short grace period (30 seconds) allows reconnection without losing the active trip state. Active trips in progress are not cancelled during brief disconnections; the Rider app shows a "connection lost" state until the driver reconnects.

- **Surge pricing and demand forecasting:** When ride requests in a region exceed driver supply by more than X%, the price multiplier increases (surge pricing). The Trip Service monitors real-time supply/demand ratios per geohash cell (updated every 30 seconds via a Flink streaming job). The current surge multiplier is stored in Redis per cell and included in the price estimate shown to the rider before they confirm. Forecasting uses historical demand patterns (day-of-week × hour-of-day × weather × events) to pre-position drivers before demand spikes.

## Trade-offs

**Decision 1: Real-time geo-index in Redis vs. database spatial index (PostGIS)**

*Option A: Redis Geo Index (GEOADD/GEORADIUS)*
- Pro: Sub-millisecond query latency for nearest-driver searches — entire driver fleet fits in memory.
- Pro: Built-in geo commands; no special spatial query language needed.
- Con: Redis is single-threaded; 2.5M location writes/sec requires Redis Cluster sharding by geohash region.
- Con: No persistent storage — data loss on Redis restart unless paired with an append-only log or periodic RDB snapshot.

*Option B: PostGIS spatial index (B-tree on geography type)*
- Pro: ACID transactions, persistent, and queryable with full SQL for analytics.
- Pro: ST_DWithin queries are highly optimized and can handle complex spatial predicates.
- Con: PostgreSQL disk-based storage adds 10–50 ms per geo query — too slow for real-time matching at 1,667 requests/sec.
- Con: Write amplification from 2.5M location updates/sec will saturate even a very well-tuned Postgres instance.

**Decision 2: Per-request matching vs. batched bipartite matching**

*Option A: Greedy per-request matching (offer to nearest available driver)*
- Pro: Immediate matching — median time to offer is <1 second.
- Pro: Simple algorithm; no global state needed; scales trivially with request volume.
- Con: Locally greedy = globally suboptimal; can create driver deserts in some areas while over-serving others.
- Con: Spiky trip patterns (rush hour in one neighborhood) cause thrashing — many drivers picked up and dropped off in the same block.

*Option B: Batched bipartite matching (global optimum over a 2-second window)*
- Pro: Minimizes total empty miles and wait times across all pending requests simultaneously.
- Pro: Fairer for drivers and riders — avoids pathological assignments that would occur with greedy matching.
- Con: Adds up to 2 seconds of matching latency — must be communicated to users as "searching for driver."
- Con: Algorithm complexity is O(N³) for N pending requests in a window — requires specialized matching infrastructure at Uber/Lyft scale.

## Google Angle

Google Maps Platform provides the mapping, routing, ETA computation, and real-time traffic data that every ride-sharing company (including Waymo, Google's autonomous vehicle subsidiary) depends on. The Distance Matrix API used in the ETA Service is directly a Google product. More deeply, Google's Waymo uses the same geo-indexing and real-time matching infrastructure for autonomous vehicle dispatch — except instead of checking driver availability via a WebSocket, it checks vehicle battery level, route feasibility, and sensor health. Google's Spanner database (globally distributed, strongly consistent) is the backing store that Waymo uses for trip state, matching the role of Postgres in this design but with multi-region active-active writes that Postgres cannot provide. The S2 geometry library used for spatial indexing was built by Google and is open-sourced — Google Maps uses it internally for all geographic computations, making it the standard geo-cell system for any Google-adjacent infrastructure project.

## Key Numbers to Remember

- Driver location update rate: 1 GPS update per 4 seconds × 10M drivers = 2.5M location writes/sec.
- Redis GEORADIUS latency: <1 ms for nearest-10 within 5 km — entire global driver fleet fits in 160 MB.
- S2 cell level 12: approximately 600m × 600m — standard granularity for ride-sharing dispatch zones.
- Matching SLA: rider must receive a driver offer within 5 seconds of trip request in 95th percentile.
- Surge pricing lag: 30-second update window for supply/demand ratio per geohash cell.
- Bipartite matching complexity: O(N³) for N requests — only feasible with N < 1,000; batch over 2-second windows at city-block granularity.
