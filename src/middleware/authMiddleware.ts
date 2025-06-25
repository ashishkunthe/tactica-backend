import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwt_secret = process.env.JWT_SECRET as string;

interface AuthenticatedRequest extends Request {
  userId?: string;
}

function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  try {
    // @ts-ignore
    const decode = jwt.verify(token, jwt_secret) as { userId: string };
    if (!decode) {
      return res.json({
        message: "incorrect credentials",
      });
    }

    req.userId = decode.userId;

    next();
  } catch (error) {
    res.status(401).json({
      message: " something went wrong",
    });
  }
}

export default authMiddleware;
