import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

/**
 * Aiven free tier has very tight connection limits (~5-10 max).
 * 
 * Key settings:
 *  - connection_limit=3   → never exhaust Aiven's pool (leave headroom)
 *  - pool_timeout=10      → fail fast instead of queuing forever
 *  - connect_timeout=15   → give cold-start DB enough time to wake up
 *  - statement_cache_size=0 → PgBouncer on Aiven doesn't support prepared statements
 *    (without this you'll get "prepared statement already exists" errors in prod)
 */
const buildDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");

  const parsed = new URL(url);

  // Aiven uses PgBouncer — disable prepared statement caching
  parsed.searchParams.set("pgbouncer", "true");
  parsed.searchParams.set("statement_cache_size", "0");

  // Tight pool: 3 connections max, fail fast on timeout
  parsed.searchParams.set("connection_limit", "3");
  parsed.searchParams.set("pool_timeout", "10");
  parsed.searchParams.set("connect_timeout", "15");

  return parsed.toString();
};

const createPrismaClient = () =>
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]   // removed "query" — it's very noisy and slows dev
        : ["error"],
    datasources: {
      db: {
        url: buildDatabaseUrl(),
      },
    },
  });

export const prisma = global.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}