import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { rentalService } from './rental.service';

const createRental = catchAsync(async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.id; 
  const result = await rentalService.createRentalIntoDB(req.body, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Rental created successfully",
    data: result,
  });
});

const returnVehicle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params; 
  const { returnTime } = req.body; 
  const result = await rentalService.returnVehicleInDB(Number(id), returnTime);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Vehicle returned successfully",
    data: result,
  });
});


const getMyRentals = catchAsync(async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.id;
  const result = await rentalService.getUserRentalsFromDB(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Rentals retrieved successfully",
    data: result,
  });
});

export const rentalController = {
  createRental, 
  returnVehicle,
  getMyRentals 
};