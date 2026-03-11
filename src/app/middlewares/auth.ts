import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import config from '../config'; 


declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authMiddleware = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;


  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'You are not authorized! Please provide a valid token.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    
    const decoded = jwt.verify(
      token, 
      config.jwt_access_secret as string
    ) as JwtPayload;


    req.user = decoded; 

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized access! Invalid or expired token.',
    });
  }
});