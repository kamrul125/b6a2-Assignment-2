import { Request, Response } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { registerSchema } from "./auth.validation"; // ভ্যালিডেশন স্কিমা ইম্পোর্ট করুন

export const authController = {
  register: catchAsync(async (req: Request, res: Response) => {
    // ১. ডাটা ভ্যালিডেশন (Zod দিয়ে রিকোয়েস্ট বডি চেক করা হচ্ছে)
    const validatedData = registerSchema.parse(req.body);

    // ২. সার্ভিসকে ভ্যালিডেট করা ডাটা পাঠানো হচ্ছে
    const user = await authService.register(validatedData);

    sendResponse(res, {
      statusCode: 201, // সাকসেসফুলি ক্রিয়েট হলে ২০১ ব্যবহার করা ভালো
      success: true,
      message: "User registered successfully",
      data: user,
    });
  }),

  login: catchAsync(async (req: Request, res: Response) => {
    const token = await authService.login(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User logged in successfully",
      data: { token },
    });
  }),

  getProfile: catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const user = req.user; // মিডলওয়্যার থেকে আসা ইউজার ডাটা
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User profile retrieved successfully",
      data: user,
    });
  }),
};