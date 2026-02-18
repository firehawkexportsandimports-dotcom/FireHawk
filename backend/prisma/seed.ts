import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@firehawk.ai";
  const password = "Admin@123"; // change later

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.log("Super admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name: "Super Admin",
      email,
      password: hashedPassword,
      role: "super_admin",
      is_approved: true,
    },
  });

  console.log("✅ Super admin created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
