import "dotenv/config";
import app from "./app";
import { prisma } from "./config/db";

const PORT = process.env.PORT || 3000;

async function main() {
  await prisma.$connect();

  // app.listen(PORT, () => {
  //   console.log(`Server running on port ${PORT}`);
  // });
}

main();