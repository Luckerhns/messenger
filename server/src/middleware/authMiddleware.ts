import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../types/error";

interface DecodedUser {
  id: number;
  phone: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedUser;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(
        "Authorization header missing or invalid format. Use: Bearer <token>",
        401,
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new AppError("Token missing", 401);
    }

    // Verify JWT
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new AppError("Server configuration error", 500);
    }

    const decoded = jwt.verify(token, secret) as DecodedUser;

    // Проверяем срок действия (хотя verify уже проверяет)
    if (decoded.exp * 1000 < Date.now()) {
      throw new AppError("Token expired", 401);
    }

    req.user = decoded;
    next();
  } catch (error: any) {
    if (error.name === "JsonWebTokenError") {
      throw new AppError("Invalid token", 401);
    } else if (error.name === "TokenExpiredError") {
      throw new AppError("Token expired", 401);
    }
    throw new AppError(error.message || "Authentication failed", 401);
  }
};
