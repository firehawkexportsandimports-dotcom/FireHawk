import { Request, Response } from "express";
import { prisma } from "../config/db";
import { homepageService } from "../services/homepage.service";

/* =====================================================
   GET FULL HOMEPAGE DATA
===================================================== */
export const getHomepage = async (req: Request, res: Response) => {
  try {
    const page = (req.query.page as string) || "home";
    const data = await homepageService.getFullHomepage(page);
    res.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch homepage content" });
  }
};


/* =====================================================
   PING — DB keep-alive for Aiven free tier cold starts
===================================================== */
export const ping = async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ ok: true, ts: Date.now() });
  } catch {
    res.json({ ok: false, ts: Date.now() });
  }
};


/* =====================================================
   UPDATE SECTION (hero / intro / quality / cta etc)
===================================================== */
export const updateSection = async (req: Request, res: Response) => {
  try {
    const section = String(req.params.section);
    const body = req.body || {};

    const data: any = {
      title:       body.title       ?? null,
      badge:       body.badge       ?? null,
      subtitle:    body.subtitle    ?? null,
      content:     body.content     ?? null,
      button_text: body.button_text ?? null,
      button_link: body.button_link ?? null,
    };

    if ((req as any).file) {
      data.image = (req as any).file.path;
    }

    const updated = await homepageService.upsertSection(section, data);
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update section" });
  }
};


/* =====================================================
   STATS
===================================================== */
export const getStats = async (req: Request, res: Response) => {
  try {
    const page = typeof req.query.page === "string" ? req.query.page : undefined;
    const stats = await homepageService.getStats(page);
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

export const getStatsByPage = async (req: Request, res: Response) => {
  try {
    const stats = await homepageService.getStats(String(req.params.page));
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

export const createStat = async (req: Request, res: Response) => {
  try {
    const { value, label, page } = req.body;
    if (!value || !label || !page) {
      return res.status(400).json({ message: "value, label and page are required" });
    }
    const stat = await homepageService.createStat({ value, label, page });
    res.json(stat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create stat" });
  }
};

export const updateStat = async (req: Request, res: Response) => {
  try {
    const stat = await homepageService.updateStat(String(req.params.id), req.body);
    res.json(stat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update stat" });
  }
};

export const deleteStat = async (req: Request, res: Response) => {
  try {
    await homepageService.deleteStat(String(req.params.id));
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete stat" });
  }
};

export const reorderStat = async (req: Request, res: Response) => {
  try {
    await homepageService.reorderStat(String(req.params.id), req.body.direction);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to reorder stat" });
  }
};


/* =====================================================
   FEATURES
===================================================== */
export const createFeature = async (req: Request, res: Response) => {
  try {
    res.json(await homepageService.createFeature(req.body));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create feature" });
  }
};

export const updateFeature = async (req: Request, res: Response) => {
  try {
    res.json(await homepageService.updateFeature(String(req.params.id), req.body));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update feature" });
  }
};

export const deleteFeature = async (req: Request, res: Response) => {
  try {
    await homepageService.deleteFeature(String(req.params.id));
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete feature" });
  }
};

export const reorderFeature = async (req: Request, res: Response) => {
  try {
    await homepageService.reorderFeature(String(req.params.id), req.body.direction);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to reorder feature" });
  }
};


/* =====================================================
   JOURNEY STEPS
===================================================== */
export const createJourney = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    let image = "";
    if ((req as any).file)   image = `/uploads/${(req as any).file.filename}`;
    else if (data.image)     image = data.image;
    else if (data.image_url) image = data.image_url;
    else                     image = "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400";

    res.json(await homepageService.createJourney({ ...data, image }));
  } catch (error) {
    console.error("Create journey error:", error);
    res.status(500).json({ message: "Failed to create journey step" });
  }
};

export const updateJourney = async (req: Request, res: Response) => {
  try {
    const data: any = { ...req.body };
    if ((req as any).file) data.image = (req as any).file.path;
    res.json(await homepageService.updateJourney(String(req.params.id), data));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update journey step" });
  }
};

export const deleteJourney = async (req: Request, res: Response) => {
  try {
    await homepageService.deleteJourney(String(req.params.id));
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete journey step" });
  }
};

export const reorderJourney = async (req: Request, res: Response) => {
  try {
    res.json(await homepageService.reorderJourney(String(req.params.id), req.body.direction));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to reorder journey" });
  }
};


/* =====================================================
   ORIGINS
===================================================== */
export const createOrigin = async (req: Request, res: Response) => {
  try {
    res.json(await homepageService.createOrigin(req.body));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create origin" });
  }
};

export const updateOrigin = async (req: Request, res: Response) => {
  try {
    res.json(await homepageService.updateOrigin(String(req.params.id), req.body));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update origin" });
  }
};

export const deleteOrigin = async (req: Request, res: Response) => {
  try {
    await homepageService.deleteOrigin(String(req.params.id));
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete origin" });
  }
};

export const reorderOrigin = async (req: Request, res: Response) => {
  try {
    res.json(await homepageService.reorderOrigin(String(req.params.id), req.body.direction));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to reorder origin" });
  }
};


/* =====================================================
   CERTIFICATIONS
===================================================== */
export const createCertification = async (req: Request, res: Response) => {
  try {
    res.json(await homepageService.createCertification(req.body));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create certification" });
  }
};

export const updateCertification = async (req: Request, res: Response) => {
  try {
    res.json(await homepageService.updateCertification(String(req.params.id), req.body));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update certification" });
  }
};

export const deleteCertification = async (req: Request, res: Response) => {
  try {
    await homepageService.deleteCertification(String(req.params.id));
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete certification" });
  }
};

export const reorderCertification = async (req: Request, res: Response) => {
  try {
    res.json(await homepageService.reorderCertification(String(req.params.id), req.body.direction));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to reorder certification" });
  }
};


/* =====================================================
   ABOUT PAGE
===================================================== */
export const getAboutPage = async (_req: Request, res: Response) => {
  try {
    const stats = await homepageService.getStats("about");
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch about stats" });
  }
};