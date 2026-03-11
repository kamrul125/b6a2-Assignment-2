import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { bikeService } from './bike.service';

const createBike = catchAsync(async (req: Request, res: Response) => {
  const result = await bikeService.createBikeIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Bike added successfully",
    data: result,
  });
});

const getAllBikes = catchAsync(async (req: Request, res: Response) => {
  const result = await bikeService.getAllBikesFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bikes retrieved successfully",
    data: result,
  });
});

const updateBike = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bikeService.updateBikeInDB(Number(id), req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bike updated successfully",
    data: result,
  });
});

const deleteBike = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bikeService.deleteBikeFromDB(Number(id));

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bike deleted successfully",
    data: result,
  });
});

export const bikeController = {
  createBike,
  getAllBikes,
  updateBike,
  deleteBike,
};