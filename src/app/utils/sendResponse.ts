import { Response } from "express";

// ১. ইন্টারফেসে statusCode যোগ করা হয়েছে
interface IResponse<T> {
  statusCode: number; // এটি এখন বাধ্যতামূলক (Required)
  success: boolean;
  message: string;
  data?: T;
}

/**
 * ২. ফাংশনটিতে ডাটা রিসিভ করার সময় 
 * res.status(data.statusCode) ব্যবহার করা হয়েছে
 */
export const sendResponse = <T>(res: Response, data: IResponse<T>) => {
  return res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;