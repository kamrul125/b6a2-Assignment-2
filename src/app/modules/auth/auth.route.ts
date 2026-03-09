import express from "express";
import { authController } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

// Example protected route
router.get("/profile", authMiddleware, authController.getProfile);

export default router;