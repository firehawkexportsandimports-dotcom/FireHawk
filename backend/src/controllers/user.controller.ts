import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { AuthRequest } from "../middleware/auth.middleware";

/* ================================
   GET ALL USERS
================================ */
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

/* ================================
   APPROVE USER
================================ */
export const approveUser = async (req: Request, res: Response) => {
  try {
    const updated = await userService.approve(
      req.params.id as string
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: "Failed to approve user",
    });
  }
};

/* ================================
   DELETE USER
================================ */

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const userIdToDelete = req.params.id as string;

    // logged in user
    const currentUser = req.user;

    //  prevent deleting yourself
    if (currentUser.id === userIdToDelete) {
      return res.status(400).json({
        message: "You cannot delete your own account",
      });
    }

    await userService.delete(userIdToDelete);

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete user",
    });
  }
};

/* ================================
   Update USER ROLE
================================ */

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const updated = await userService.updateRole(
      req.params.id as string,
      req.body.role
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update role",
    });
  }
};
