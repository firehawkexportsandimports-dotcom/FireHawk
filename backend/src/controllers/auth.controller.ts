import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Register failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await authService.login(req.body);
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
