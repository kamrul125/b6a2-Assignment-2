import express from "express";
import { userController } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = express.Router();

// Protected routes
router.use(authMiddleware);

// User CRUD
router.get("/", userController.getAllUsers);          // Admin or User
router.get("/:id", userController.getSingleUser);    // Admin or User
router.patch("/:id", userController.updateUser);     // Admin or self
router.delete("/:id", userController.deleteUser);    // Admin only

export default router;