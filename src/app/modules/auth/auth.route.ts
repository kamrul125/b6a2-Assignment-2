import express from "express";
import { authController } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = express.Router();

// ১. রিকোয়ারমেন্ট অনুযায়ী '/register' পরিবর্তন করে '/signup' করা হলো
router.post("/signup", authController.register);

// ২. রিকোয়ারমেন্ট অনুযায়ী '/login' পরিবর্তন করে '/signin' করা হলো
router.post("/signin", authController.login);

// ৩. প্রোফাইল রুটের জন্য (এটি সাধারণত GET /api/v1/users/me হতে পারে, তবে আপনার কন্ট্রোলার অনুযায়ী এখানে রাখা হলো)
router.get("/profile", authMiddleware, authController.getProfile);

export default router;