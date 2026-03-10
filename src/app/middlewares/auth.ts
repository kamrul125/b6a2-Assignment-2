import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Express এর Request ইন্টারফেসটি এক্সটেন্ড করা যাতে .user পাওয়া যায়
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string;
    }
  }
}

export const authMiddleware = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // ১. টোকেন চেক করা
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'You are not authorized! Please provide a valid token.',
    });
  }

  const token = authHeader.split(' ')[1];

  // ২. টোকেন ভেরিফাই করা
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

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