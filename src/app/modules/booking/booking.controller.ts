import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { bookingService } from './booking.service';

/**
 * রেন্টাল বা বাইক রিটার্ন করার কন্ট্রোলার
 */
const returnVehicle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params; // URL থেকে রেন্টাল আইডি নেওয়া
  const { returnTime } = req.body; // বডি থেকে রিটার্ন টাইম নেওয়া

  // সার্ভিস থেকে ক্যালকুলেশন এবং ডাটাবেজ আপডেট করা
  const result = await bookingService.returnVehicle(Number(id), returnTime);

  // আপনার আপডেট করা sendResponse অনুযায়ী ডাটা পাঠানো
  sendResponse(res, {
    statusCode: 200, // এটি এখন বাধ্যতামূলক, তাই যোগ করা হয়েছে
    success: true,
    message: "Vehicle returned successfully",
    data: result,
  });
});

export const bookingController = {
  returnVehicle,
};