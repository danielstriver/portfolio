import { Redis } from "@upstash/redis";

export const config = { runtime: "edge" };

const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
};

export default {
  async fetch(request: Request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204 });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ count: null }), {
        status: 405,
        headers: CORS_HEADERS,
      });
    }

    try {
      const redis = Redis.fromEnv();
      const count = await redis.incr("portfolio:visits");
      return new Response(JSON.stringify({ count }), {
        status: 200,
        headers: CORS_HEADERS,
      });
    } catch {
      return new Response(JSON.stringify({ count: null }), {
        status: 200,
        headers: CORS_HEADERS,
      });
    }
  },
};
