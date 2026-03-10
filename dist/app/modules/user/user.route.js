"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
// Protected routes
router.use(auth_1.authMiddleware);
// User CRUD
router.get("/", user_controller_1.userController.getAllUsers); // Admin or User
router.get("/:id", user_controller_1.userController.getSingleUser); // Admin or User
router.patch("/:id", user_controller_1.userController.updateUser); // Admin or self
router.delete("/:id", user_controller_1.userController.deleteUser); // Admin only
exports.default = router;
