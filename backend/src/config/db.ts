import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL + "&connection_limit=5&pool_timeout=30&connect_timeout=30",
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}