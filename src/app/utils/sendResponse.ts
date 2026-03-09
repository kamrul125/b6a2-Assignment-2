import { Response } from "express";

// ১. ইন্টারফেসে statusCode যোগ করা হয়েছে এবং ডাটাকে Generic <T> করা হয়েছে
interface IResponse<T> {
  statusCode: number; // এই লাইনটি জরুরি
  success: boolean;
  message: string;
  data?: T;
}

// ২. ফাংশনটিতে ডাটা রিসিভ করার লজিক আপডেট
export const sendResponse = <T>(res: Response, data: IResponse<T>) => {
  return res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};