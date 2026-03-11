import { Request, Response } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { registerSchema } from "./auth.validation";

export const authController = {
  register: catchAsync(async (req: Request, res: Response) => {
    const validatedData = registerSchema.parse(req.body);
    const user = await authService.register(validatedData);

    sendResponse(res, {
      statusCode: 201, 
      success: true,
      message: "User registered successfully",
      data: user,
    });
  }),

  login: catchAsync(async (req: Request, res: Response) => {
    const { token, user } = await authService.login(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User logged in successfully",
      data: { token, data: user },
    });
  }),

  getProfile: catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const user = req.user; 
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User profile retrieved successfully",
      data: user,
    });
  }),


  getAllUsers: catchAsync(async (req: Request, res: Response) => {
    const users = await authService.getAllUsers();
    sendResponse(res, {
      statusCode: 200, 
      success: true,
      message: "All users retrieved",
      data: users,
    });
  }),

  
  updateProfile: catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user.id;
    const updatedUser = await authService.updateProfile(userId, req.body);
    sendResponse(res, {
      statusCode: 200, 
      success: true,
      message: "User updated",
      data: updatedUser,
    });
  }),
};