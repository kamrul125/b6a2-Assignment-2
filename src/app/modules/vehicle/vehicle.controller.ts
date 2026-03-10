import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
// আপনার সার্ভিস ইমপোর্ট করুন

const createVehicle = catchAsync(async (req: Request, res: Response) => {
  // আপনার লজিক...
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Vehicle created successfully",
    data: {}, // আপনার রেজাল্ট
  });
});

// ... অন্যান্য ফাংশন (getAllVehicles, updateVehicle ইত্যাদি)

// এই অংশটি সবথেকে জরুরি:
export const vehicleController = {
  createVehicle,
  // বাকি ফাংশনগুলো এখানে যোগ করুন
};