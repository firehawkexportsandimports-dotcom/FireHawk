import {prisma} from "../config/db";



export const userService = {
  async getAll() {
    return prisma.user.findMany({
      orderBy: { created_at: "desc" },
    });
  },

  async approve(id: string) {
    return prisma.user.update({
      where: { id },
      data: { is_approved: true },
    });
  },

  async delete(id: string) {
  return prisma.user.delete({
    where: { id },
  });
},

async updateRole(id: string, role: string) {
  return prisma.user.update({
    where: { id },
    data: { role: role as any },
  });
},

};
