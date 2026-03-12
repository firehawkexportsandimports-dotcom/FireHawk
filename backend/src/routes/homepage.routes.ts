import { Router } from "express";
import {
  getHomepage,
  ping,
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
  reorderFeature,
  reorderJourney,
  reorderOrigin,
  reorderCertification,
  reorderStat,
  deleteStat,
  updateStat,
  createStat,
  getStats,
} from "../controllers/homepage.controller";

import { upload } from "../middleware/upload";

const router = Router();

/* =====================================================
   KEEP-ALIVE PING (Aiven free tier cold-start fix)
   Frontend calls this on app load to pre-warm the DB.
   Must be registered in your main server file as:
     app.get("/api/ping", ping);
   OR keep it here if this router is mounted at "/api"
===================================================== */
router.get("/ping", ping);


/* =====================================================
   PUBLIC
===================================================== */
router.get("/homepage", getHomepage);


/* =====================================================
   ⚠️  CRITICAL BUG FIX — route ordering
   
   In your original file, these stat/feature/journey routes
   were registered AFTER router.put("/homepage/:section").
   
   Express matches routes in registration order, so:
     PUT  /homepage/stats   → matched ":section" = "stats"  ✓ (accident)
     GET  /homepage/stats   → matched ":section" = "stats"  ✗ (wrong handler!)
     POST /homepage/stats   → matched ":section" = "stats"  ✗ (wrong handler!)
   
   Any GET/POST/DELETE to /homepage/stats, /homepage/features,
   /homepage/journey etc was being swallowed by the :section wildcard.
   
   Fix: register all specific sub-routes BEFORE the :section wildcard.
===================================================== */

/* ─── Stats ──────────────────────────────────────────────────────────── */
router.get(   "/homepage/stats",              getStats);
router.post(  "/homepage/stats",              createStat);
router.put(   "/homepage/stats/:id",          updateStat);
router.delete("/homepage/stats/:id",          deleteStat);
router.patch( "/homepage/stats/:id/reorder",  reorderStat);

/* ─── Features ───────────────────────────────────────────────────────── */
router.post(  "/homepage/features",               createFeature);
router.put(   "/homepage/features/:id",           updateFeature);
router.delete("/homepage/features/:id",           deleteFeature);
router.patch( "/homepage/features/:id/reorder",   reorderFeature);

/* ─── Journey ────────────────────────────────────────────────────────── */
router.post(  "/homepage/journey",                upload.single("image"), createJourney);
router.put(   "/homepage/journey/:id",            upload.single("image"), updateJourney);
router.delete("/homepage/journey/:id",            deleteJourney);
router.patch( "/homepage/journey/:id/reorder",    reorderJourney);

/* ─── Origins ────────────────────────────────────────────────────────── */
router.post(  "/homepage/origins",                createOrigin);
router.put(   "/homepage/origins/:id",            updateOrigin);
router.delete("/homepage/origins/:id",            deleteOrigin);
router.patch( "/homepage/origins/:id/reorder",    reorderOrigin);

/* ─── Certifications ─────────────────────────────────────────────────── */
router.post(  "/homepage/certifications",         createCertification);
router.put(   "/homepage/certifications/:id",     updateCertification);
router.delete("/homepage/certifications/:id",     deleteCertification);
router.patch( "/homepage/certifications/:id/reorder", reorderCertification);


/* =====================================================
   SECTION WILDCARD — must stay LAST
   PUT /homepage/:section  (hero, intro, quality, cta…)
   This matches ANY /homepage/<anything> so every specific
   route above must be registered before this line.
===================================================== */
router.put("/homepage/:section", upload.single("image"), updateSection);


export default router;