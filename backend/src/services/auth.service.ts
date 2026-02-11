import prisma from "../config/db";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

export const authService = {

  async register(data: {
    name: string;
    email: string;
    password: string;
  }) {
    const hashed = await bcrypt.hash(data.password, 10);

    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashed,
        role: "editor",
        is_approved: false,
      },
    });
  },

  async login(data: { email: string; password: string }) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) throw new Error("User not found");

    if (!user.is_approved)
      throw new Error("Account not approved yet");

    const valid = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!valid) throw new Error("Invalid password");

    const token = generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },
};
