import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

export const userController = {
  getAllUsers: catchAsync(async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    sendResponse(res, { 
      statusCode: 200, 
      success: true, 
      message: "All users retrieved", 
      data: users 
    });
  }),

  getSingleUser: catchAsync(async (req: Request, res: Response) => {
    const user = await userService.getSingleUser(Number(req.params.id));
    sendResponse(res, { 
      statusCode: 200,
      success: true, 
      message: "User retrieved", 
      data: user 
    });
  }),

  updateUser: catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const currentUser = req.user;
    const updatedUser = await userService.updateUser(Number(req.params.id), req.body, currentUser);
    sendResponse(res, { 
      statusCode: 200, 
      success: true, 
      message: "User updated", 
      data: updatedUser 
    });
  }),

  deleteUser: catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const currentUser = req.user;
    await userService.deleteUser(Number(req.params.id), currentUser);
    sendResponse(res, { 
      statusCode: 200, 
      success: true, 
      message: "User deleted",
      data: null 
    });
  }),
};