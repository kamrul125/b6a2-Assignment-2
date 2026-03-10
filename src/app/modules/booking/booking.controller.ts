import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { bookingService } from './booking.service';

/**
 * ১. নতুন বুকিং তৈরি করার কন্ট্রোলার (POST /api/v1/bookings)
 */
const createBooking = catchAsync(async (req: Request, res: Response) => {
  // আপনার authMiddleware থেকে ইউজার আইডি নেওয়া (যদি req.user এ থাকে)
  // @ts-ignore
  const userId = req.user.id; 

  const result = await bookingService.createBookingIntoDB(req.body, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Rental created successfully",
    data: result,
  });
});

/**
 * ২. রেন্টাল বা বাইক রিটার্ন করার কন্ট্রোলার (PUT /api/v1/bookings/return/:id)
 */
const returnVehicle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params; 
  const { returnTime } = req.body; 

  // সার্ভিস থেকে ক্যালকুলেশন এবং ডাটাবেজ আপডেট
  const result = await bookingService.returnVehicle(Number(id), returnTime);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Vehicle returned successfully",
    data: result,
  });
});

export const bookingController = {
  createBooking,
  returnVehicle,
};