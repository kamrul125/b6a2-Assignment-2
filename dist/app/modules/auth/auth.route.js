"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
// ১. রিকোয়ারমেন্ট অনুযায়ী '/register' পরিবর্তন করে '/signup' করা হলো
router.post("/signup", auth_controller_1.authController.register);
// ২. রিকোয়ারমেন্ট অনুযায়ী '/login' পরিবর্তন করে '/signin' করা হলো
router.post("/signin", auth_controller_1.authController.login);
// ৩. প্রোফাইল রুটের জন্য (এটি সাধারণত GET /api/v1/users/me হতে পারে, তবে আপনার কন্ট্রোলার অনুযায়ী এখানে রাখা হলো)
router.get("/profile", auth_1.authMiddleware, auth_controller_1.authController.getProfile);
exports.default = router;
