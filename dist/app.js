"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const app = (0, express_1.default)(); // ১. আগে অ্যাপটি ডিক্লেয়ার করুন
// ২. মিডলওয়্যার (Middlewares)
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// ৩. অ্যাপ্লিকেশন রুটস (Application Routes)
app.use("/api/v1", routes_1.default);
// ৪. ডিফল্ট রুট
app.get("/", (req, res) => {
    res.send("Vehicle Rental System Server is running!");
});
// ৫. গ্লোবাল এরর হ্যান্ডলার (এটি সব সময় সব রুটের নিচে হতে হবে)
app.use(globalErrorHandler_1.errorHandler);
exports.default = app;
