import { Router } from "express";
import {
  getHomepage,
  updateSection,
  createFeature,
  updateFeature,
  deleteFeature,
  createJourney,
  updateJourney,
  deleteJourney,
  createOrigin,
  updateOrigin,
  deleteOrigin,
  createCertification,
  updateCertification,
  deleteCertification,
} from "../controllers/homepage.controller";

import { upload } from "../middleware/upload";

const router = Router();

/* =====================================================
   PUBLIC ROUTES
===================================================== */

/**
 * GET FULL HOMEPAGE DATA
 * Used by frontend homepage
 */
router.get("/homepage", getHomepage);


/* =====================================================
   SECTION UPDATE (Hero / Intro / Quality / CTA etc)
===================================================== */

/**
 * Update single homepage section
 */
router.put(
  "/homepage/:section",
  upload.single("image"),
  updateSection
);


/* =====================================================
   FEATURES (Why Firehawk items)
===================================================== */

router.post("/homepage/features", createFeature);
router.put("/homepage/features/:id", updateFeature);
router.delete("/homepage/features/:id", deleteFeature);


/* =====================================================
   JOURNEY STEPS (Farm → Export)
===================================================== */

router.post(
  "/homepage/journey",
  upload.single("image"),
  createJourney
);

router.put(
  "/homepage/journey/:id",
  upload.single("image"),
  updateJourney
);

router.delete("/homepage/journey/:id", deleteJourney);


/* =====================================================
   ORIGINS (Kerala / Karnataka etc)
===================================================== */

router.post("/homepage/origins", createOrigin);
router.put("/homepage/origins/:id", updateOrigin);
router.delete("/homepage/origins/:id", deleteOrigin);


/* =====================================================
   CERTIFICATIONS
===================================================== */

router.post("/homepage/certifications", createCertification);
router.put("/homepage/certifications/:id", updateCertification);
router.delete("/homepage/certifications/:id", deleteCertification);


export default router;
