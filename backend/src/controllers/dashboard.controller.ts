import { Response } from "express";
import { dashboardService } from "../services/dashboard.service";
import { AuthRequest } from "../middleware/auth.middleware";

export const getDashboardStats = async (
  _req: AuthRequest,
  res: Response
) => {
  try {
    const stats = await dashboardService.getStats();
    res.json(stats);
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      message: "Failed to load dashboard stats",
    });
  }
};
