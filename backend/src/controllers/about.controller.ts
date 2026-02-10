import { Request, Response } from "express";
import { aboutService } from "../services/about.service";

export const getAboutContent = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await aboutService.getAll();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch about content" });
  }
};

export const updateAboutSection = async (
  req: Request,
  res: Response
) => {
  try {
    const { section } = req.params as { section: string };

    const updated = await aboutService.upsert(section, {
        title: req.body.title,
        subtitle: req.body.subtitle,
        badge: req.body.badge,
        content: req.body.content,
        image: req.file?.path || req.body.image,
        countries: req.body.countries
            ? JSON.parse(req.body.countries)
            : [],

    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update section" });
  }
};
