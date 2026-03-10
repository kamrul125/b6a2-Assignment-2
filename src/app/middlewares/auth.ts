import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import config from '../config'; // config ফাইলটি ইমপোর্ট করুন

// Express এর Request ইন্টারফেসটি এক্সটেন্ড করা
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authMiddleware = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // ১. টোকেন আছে কি না চেক করা
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'You are not authorized! Please provide a valid token.',
    });
  }

  const token = authHeader.split(' ')[1];

  // ২. টোকেন ভেরিফাই করা
  try {
    // এখানে config.jwt_access_secret ব্যবহার করুন যা আপনার .env এর সাথে মিলবে
    const decoded = jwt.verify(
      token, 
      config.jwt_access_secret as string
    ) as JwtPayload;

    // ৩. ডিকোড করা ডাটা রিকোয়েস্টে রাখা
    req.user = decoded; 

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized access! Invalid or expired token.',
    });
  }
});