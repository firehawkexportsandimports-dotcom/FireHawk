import { Request, Response } from "express";
import { homepageService } from "../services/homepage.service";
import { testimonialService } from "../services/testimonial.service";

/* =====================================================
   GET FULL HOMEPAGE DATA (PUBLIC + ADMIN)
===================================================== */
export const getHomepage = async (_req: Request, res: Response) => {
  try {
    const [
      sections,
      features,
      journey,
      origins,
      certifications,
      testimonials,
    ] = await Promise.all([
      homepageService.getAllSections(),
      homepageService.getFeatures(),
      homepageService.getJourney(),
      homepageService.getOrigins(),
      homepageService.getCertifications(),
      testimonialService.getFeatured(), 
    ]);

    res.json({
      sections,
      features,
      journey,
      origins,
      certifications,
      testimonials, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch homepage content",
    });
  }
};


/* =====================================================
   UPDATE SECTION (HERO / INTRO / QUALITY / CTA etc)
===================================================== */
export const updateSection = async (req: Request, res: Response) => {
  try {
    const section = req.params.section as string;

    const body = req.body || {};

    const data: any = {
      title: body.title ?? null,
      badge: body.badge ?? null,
      subtitle: body.subtitle ?? null,
      content: body.content ?? null,
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
    res.status(500).json({
      message: "Failed to update section",
    });
  }
};


/* =====================================================
   FEATURES
===================================================== */

export const createFeature = async (req: Request, res: Response) => {
  try {
    const feature = await homepageService.createFeature(req.body);
    res.json(feature);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create feature" });
  }
};

export const updateFeature = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const updated = await homepageService.updateFeature(id, req.body);
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update feature" });
  }
};

export const deleteFeature = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await homepageService.deleteFeature(id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete feature" });
  }
};

export const reorderFeature = async (req: Request, res: Response) => {
  const id = String(req.params.id); 
  const { direction } = req.body;

  await homepageService.reorderFeature(id, direction);

  res.json({ success: true });
};


/* =====================================================
   JOURNEY STEPS
===================================================== */

export const createJourney = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    let image = '';
    
    // Handle file upload
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else if (data.image) {
      // If image is a URL string (from frontend)
      image = data.image;
    } else if (data.image_url) {
      // Backward compatibility
      image = data.image_url;
    } else {
      // Default image if none provided
      image = "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400";
    }
    
    const journey = await homepageService.createJourney({
      title: data.title,
      description: data.description,
      icon: data.icon,
      sort_order: data.sort_order || 0,
      image: image,
    });
    res.json(journey);
  } catch (error) {
    console.error('Create journey error:', error);
    res.status(500).json({ message: 'Failed to create journey step' });
  }
};

export const updateJourney = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const data: any = { ...req.body };

    if ((req as any).file) {
      data.image = (req as any).file.path;
    }

    const updated = await homepageService.updateJourney(id, data);
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update journey step",
    });
  }
};

export const deleteJourney = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await homepageService.deleteJourney(id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete journey step",
    });
  }
};

export const reorderJourney = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const { direction } = req.body;

    const data = await homepageService.reorderJourney(
      id,
      direction
    );

    res.json(data);
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
    const origin = await homepageService.createOrigin(req.body);
    res.json(origin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create origin" });
  }
};

export const updateOrigin = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const updated = await homepageService.updateOrigin(id, req.body);
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update origin" });
  }
};

export const deleteOrigin = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await homepageService.deleteOrigin(id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete origin" });
  }
};

export const reorderOrigin = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const { direction } = req.body;

    const data = await homepageService.reorderOrigin(
      id,
      direction
    );

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to reorder origin" });
  }
};


/* =====================================================
   CERTIFICATIONS
===================================================== */

export const createCertification = async (
  req: Request,
  res: Response
) => {
  try {
    const cert = await homepageService.createCertification(req.body);
    res.json(cert);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create certification",
    });
  }
};

export const updateCertification = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;
    const updated =
      await homepageService.updateCertification(id, req.body);

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update certification",
    });
  }
};

export const deleteCertification = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;
    await homepageService.deleteCertification(id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete certification",
    });
  }
};

export const reorderCertification = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const { direction } = req.body;

    const data = await homepageService.reorderCertification(
      id,
      direction
    );

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to reorder certification" });
  }
};
