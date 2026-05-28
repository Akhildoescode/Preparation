# DSA Prep Tracker

Personal app to work through a 7-day Google L3/L4 DSA prep plan. 95 curated problems, full written guides for every problem, spaced repetition, mock timer, and pattern trainer — all running locally in your browser.

## Setup

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). No backend, no account needed.

## Features

| Feature | Where |
|---|---|
| 95 curated LeetCode problems across 6 study days | `/day/1` through `/day/6` |
| Full guide per problem (approach, interviewer script, Java solution, edge cases, related) | Problem detail page |
| Status, confidence rating, time tracking, personal notes | Problem detail page |
| Monaco editor for your own Java solution | Problem detail page |
| Spaced repetition review queue | `/review` |
| Mock interview timer (30-min with phase bands) | `/mock` |
| Pattern trainer | `/trainer` |
| Complexity quiz | `/complexity` |
| Daily check-ins | Dashboard |
| Pattern cheat sheet (printable) | `/cheatsheet` |
| Global search (Cmd+K) | Anywhere |

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `⌘K` / `Ctrl+K` | Open problem search |
| `?` | Show all shortcuts |
| `/` | Open search |
| `g d` | Go to Dashboard |
| `g r` | Go to Review queue |
| `j` / `k` | Navigate problem list |
| `Enter` | Open focused problem |
| `s` | Toggle star (problem detail) |
| `1` / `2` / `3` / `4` | Set Not Started / Attempted / Solved / Needs Review (problem detail) |

## Data

All state is stored in your browser's `localStorage` under key `dsa-prep-state-v1`. Use **Settings → Export** to back it up as JSON before clearing browser data or switching machines.

## Problem coverage

- **Day 1** — Arrays, Strings, Two Pointers, Sliding Window (12 problems)
- **Day 2** — Hashing, Linked Lists, Stacks (15 problems)
- **Day 3** — Trees & Tries (15 problems)
- **Day 4** — Heaps, Graphs, Union-Find (16 problems)
- **Day 5** — Binary Search, Backtracking, Bit Manipulation (19 problems)
- **Day 6** — DP, Greedy, Intervals (20 problems)
- **Day 7** — Review (uses the starred/needs-review queue)

Every problem has full written content: approach walkthrough (brute → optimal), exact interviewer script, annotated Java solution, edge cases, and related patterns.

## Tech stack

Next.js 15+ · React 19 · TypeScript strict · Tailwind CSS v4 · shadcn/ui · Monaco Editor · react-markdown

## How I used this

[Fill in post-interview — what worked, what you'd change, how the 7 days went]
