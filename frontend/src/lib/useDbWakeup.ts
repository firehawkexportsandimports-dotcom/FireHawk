/**
 * useDbWakeup.ts
 *
 * Pings a lightweight `/api/ping` endpoint as soon as the app loads.
 * This wakes the Aiven free-tier Postgres before the user triggers a real
 * query, hiding the cold-start latency behind the page render time.
 *
 * USAGE — call once at the very top of main.tsx (before React renders):
 *   import { warmupDb } from "@/lib/useDbWakeup";
 *   warmupDb();
 *
 * Or use the hook inside a component if you prefer:
 *   import { useDbWakeup } from "@/lib/useDbWakeup";
 *   useDbWakeup(); // call inside App or main layout
 */

const API_BASE = import.meta.env.VITE_API_URL || "/api";
const PING_URL = `${API_BASE}/ping`;
const RETRY_INTERVAL_MS = 10 * 60 * 1000; // re-ping every 10 min to keep connection warm

let lastPinged = 0;

/**
 * Fire-and-forget ping — call this as early as possible.
 * Safe to call multiple times; it throttles itself.
 */
export async function warmupDb(): Promise<void> {
  const now = Date.now();
  if (now - lastPinged < RETRY_INTERVAL_MS) return; // already warmed recently
  lastPinged = now;

  try {
    await fetch(PING_URL, {
      method: "GET",
      // Keep the request tiny — we only care that it reaches the DB
      headers: { Accept: "application/json" },
      // Don't block anything waiting for this
      priority: "low" as RequestPriority,
    });
  } catch {
    // Silently ignore — this is best-effort only
  }
}

/**
 * React hook version — use in your top-level component.
 */
import { useEffect } from "react";

export function useDbWakeup(): void {
  useEffect(() => {
    warmupDb();

    // Re-ping periodically while the tab is open to keep Aiven connection alive
    const interval = setInterval(warmupDb, RETRY_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);
}

/**
 * ─── BACKEND: add this tiny route to your server ────────────────────────────
 *
 * Express example:
 *
 *   app.get("/api/ping", async (req, res) => {
 *     await db.query("SELECT 1");   // or pool.query / prisma.$queryRaw`SELECT 1`
 *     res.json({ ok: true });
 *   });
 *
 * This forces the DB connection pool to open a connection, so by the time
 * the user clicks anything, the pool is already warm.
 * ────────────────────────────────────────────────────────────────────────────
 */