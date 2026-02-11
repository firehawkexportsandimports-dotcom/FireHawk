import { Request, Response } from "express";
import { contactService } from "../services/contact.service";

export const getContactInfo = async (_req: Request, res: Response) => {
  try {
    const data = await contactService.get();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contact info" });
  }
};

export const updateContactInfo = async (req: Request, res: Response) => {
  try {
    const updated = await contactService.update({
        badge: req.body.badge,
        title: req.body.title,
        description: req.body.description,
        company_description: req.body.company_description,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        phone: req.body.phone,
        email: req.body.email,
        working_hours: req.body.working_hours,
        map_embed: req.body.map_embed,
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update contact info" });
  }
};
