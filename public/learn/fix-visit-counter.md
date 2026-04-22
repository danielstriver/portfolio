# Fix: Visitor Counter Widget Disappearing

**Project:** danielstriver.vercel.app  
**Date:** April 2026  
**Symptom:** The visitor counter widget was visible, then silently disappeared with no error shown.

---

## What the widget does

The visitor counter is a small floating badge (fixed, bottom-left corner) that shows how many unique sessions have visited the portfolio. It only counts once per browser session — page refreshes do not increment the counter.

---

## Root cause: third-party API went offline

The original implementation called an external free counting service directly from the browser:

```ts
// VisitorCounter.tsx (old)
const response = await fetch(
  `https://api.counterapi.dev/v1/daniel-niyomugenga-portfolio/visits/up`
);
```

`counterapi.dev` was a free, third-party visitor counting API. It worked reliably for a while, then went permanently offline ("no available server"). The same fate had already hit its predecessor, `countapi.xyz`, which was dead at the DNS level.

The component was silently coded to render nothing on failure:

```ts
if (count === null) return null;
```

So when the API died, the widget just vanished — no error, no fallback, no warning. The counter was gone and it looked like it was never there.

**This is the risk of any free third-party API with no SLA: it can disappear at any time with zero notice.**

---

## How it was fixed

### 1. Self-hosted edge function (`api/counter.ts`)

Instead of calling an external service, the browser now calls your own Vercel Edge Function:

```ts
// api/counter.ts
import { Redis } from "@upstash/redis";

export const config = { runtime: "edge" };

export default {
  async fetch(request: Request) {
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ count: null }), { status: 405 });
    }

    try {
      const redis = Redis.fromEnv();
      const count = await redis.incr("portfolio:visits");
      return new Response(JSON.stringify({ count }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      });
    } catch {
      return new Response(JSON.stringify({ count: null }), { status: 200 });
    }
  },
};
```

The function uses **Upstash Redis** (the same instance already used for the contact form rate limiter) to atomically increment a counter key `portfolio:visits` on every new session.

### 2. Backend: Upstash Redis

Upstash Redis is used because:
- Already a dependency in the project (`@upstash/redis`)
- Free tier, no expiry
- Has a simple REST API that works in Vercel Edge Functions
- `INCR` is atomic — no double-counting possible

The key stored is `portfolio:visits`. Every new session increments it by 1 and returns the new total.

### 3. Updated component (`src/components/VisitorCounter.tsx`)

```ts
useEffect(() => {
  const fetchCount = async () => {
    // Don't count if already counted this session
    const alreadyCounted = sessionStorage.getItem("visit_counted");
    const cachedCount = sessionStorage.getItem("visit_count_value");

    if (alreadyCounted && cachedCount !== null) {
      setCount(parseInt(cachedCount, 10));
      return;
    }

    // New session — increment and cache
    const response = await fetch("/api/counter", { method: "POST" });
    const data = await response.json();
    if (typeof data.count === "number") {
      sessionStorage.setItem("visit_counted", "1");
      sessionStorage.setItem("visit_count_value", String(data.count));
      setCount(data.count);
    }
  };

  fetchCount();
}, []);
```

Key behaviors:
- Calls `/api/counter` (same origin — no CORS, no third-party dependency)
- Uses `sessionStorage` to avoid counting reloads within the same tab/session
- Still returns `null` and hides the widget if the edge function fails — graceful degradation

### 4. Moved to fixed bottom-left position

Previously embedded in the footer. Now a fixed floating widget:

```tsx
<div className="fixed bottom-6 left-6 z-40">
  ...
</div>
```

This mirrors the WhatsApp button on the bottom-right and keeps it always visible regardless of scroll position.

---

## Environment variables required

The edge function reads from these two env vars (set in your Vercel project):

| Variable | Where to get it |
|---|---|
| `UPSTASH_REDIS_REST_URL` | Upstash console → your database → REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash console → your database → REST Token |

Add them with:
```bash
npx vercel env add UPSTASH_REDIS_REST_URL production
npx vercel env add UPSTASH_REDIS_REST_URL development
npx vercel env add UPSTASH_REDIS_REST_TOKEN production
npx vercel env add UPSTASH_REDIS_REST_TOKEN development
```

Pull them locally:
```bash
npx vercel env pull .env.local
```

The component hides itself if the env vars are missing or Redis is unreachable — no broken UI.

---

## How the full flow works

```
User opens portfolio (new session)
        │
        └─ sessionStorage: "visit_counted"?
              │
              ├─ YES → read "visit_count_value" from sessionStorage, show it
              │         (no network request — instant, free)
              │
              └─ NO  → POST /api/counter  (your Vercel Edge Function)
                              │
                              └─ Redis INCR "portfolio:visits"
                                      │
                                      └─ Returns { count: N }
                                              │
                                              ├─ Store in sessionStorage
                                              └─ Show in widget (bottom-left)

User refreshes page
        │
        └─ sessionStorage: "visit_counted" = "1" → show cached count, no INCR
```

---

## Why sessionStorage and not localStorage?

| | sessionStorage | localStorage |
|---|---|---|
| Scope | Current tab/session only | Persists across all sessions |
| On tab close | Cleared | Persists |
| On page reload | Survives | Survives |

`sessionStorage` is correct here because closing and reopening the browser (or opening a new tab) represents a genuine new visit. `localStorage` would prevent the counter from ever incrementing for a returning visitor on the same device.

---

## Testing locally

The edge function does **not** run under `vite dev`. You need `vercel dev`:

```bash
npx vercel dev --yes
```

After pulling env vars (`vercel env pull .env.local`), the counter will increment against the real Redis instance. Note that `vercel dev` on Windows can be unstable — if it crashes, test by pushing to Vercel and checking production directly.

---

## Lessons

1. **Never depend on free third-party APIs for core UI.** They disappear without warning. If you must use one, add a visible fallback state rather than silent `return null`.
2. **Self-host critical features** using your existing infrastructure (Vercel Edge Functions + Upstash Redis are already in the project).
3. **`sessionStorage` > `localStorage` for session-scoped counting** — it naturally maps to the concept of a "visit."
4. **Atomic Redis `INCR`** is the correct primitive for a shared counter — it's a single operation with no race conditions, unlike a read-then-write approach.
