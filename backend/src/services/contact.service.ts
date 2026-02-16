import {prisma} from "../config/db";

class ContactService {
  async get() {
    const data = await prisma.contactInfo.findFirst();

    if (!data) {
      return prisma.contactInfo.create({
        data: {},
      });
    }

    return data;
  }

  async update(data: any) {
    const existing = await prisma.contactInfo.findFirst();

    if (!existing) {
      return prisma.contactInfo.create({ data });
    }

    return prisma.contactInfo.update({
      where: { id: existing.id },
      data,
    });
  }
}

export const contactService = new ContactService();
