import "dotenv/config";
import app from "./app";
import { prisma } from "./config/db";

const PORT = process.env.PORT || 3000;

async function main() {
  await prisma.$connect();
  // console.log("✅ Database connected");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main().catch((e) => {
  console.error("❌ Failed to start server:", e.message);
  process.exit(1);
});