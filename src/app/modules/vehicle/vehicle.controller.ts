import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { vehicleService } from './vehicle.service';

// ১. বাইক তৈরি
const createVehicle = catchAsync(async (req: Request, res: Response) => {
  const result = await vehicleService.createVehicle(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Bike added successfully",
    data: result,
  });
});

// ২. সব বাইক দেখা
const getAllVehicles = catchAsync(async (req: Request, res: Response) => {
  const result = await vehicleService.getAllVehicles();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bikes retrieved successfully",
    data: result,
  });
});

// ৩. নির্দিষ্ট বাইক দেখা
const getSingleVehicle = catchAsync(async (req: Request, res: Response) => {
  const result = await vehicleService.getSingleVehicle(Number(req.params.id));
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bike retrieved successfully",
    data: result,
  });
});

// ৪. বাইক আপডেট (এটি আপনার এরর দূর করবে)
const updateVehicle = catchAsync(async (req: Request, res: Response) => {
  const result = await vehicleService.updateVehicle(Number(req.params.id), req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bike updated successfully",
    data: result,
  });
});

// ৫. বাইক ডিলিট (এটিও আপনার এরর দূর করবে)
const deleteVehicle = catchAsync(async (req: Request, res: Response) => {
  const result = await vehicleService.deleteVehicle(Number(req.params.id));
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bike deleted successfully",
    data: result,
  });
});

// ৬. রেন্টাল ক্রিয়েট
const createRental = catchAsync(async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.id;
  const { bikeId, startTime } = req.body;
  const result = await vehicleService.createRental(userId, bikeId, startTime);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Rental created successfully",
    data: result,
  });
});

// ৭. রেন্টাল রিটার্ন
const returnRental = catchAsync(async (req: Request, res: Response) => {
  const result = await vehicleService.returnRental(Number(req.params.id));
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bike returned successfully",
    data: result,
  });
});

// এই অবজেক্টে সব নাম থাকা বাধ্যতামূলক
export const vehicleController = {
  createVehicle,
  getAllVehicles,
  getSingleVehicle,
  updateVehicle,   // এখানে অ্যাড করা হলো
  deleteVehicle,   // এখানে অ্যাড করা হলো
  createRental,
  returnRental,
};