import serverless from "serverless-http";
import app from "../src/app";
import { prisma } from "../src/config/db";

async function warmup() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("DB warm");
  } catch (e) {
    console.log("DB warmup failed");
  }
}

warmup();

export default serverless(app);