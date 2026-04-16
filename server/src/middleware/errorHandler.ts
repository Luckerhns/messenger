import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../types/error";

const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', {
    message: err.message,
    statusCode: (err as any).statusCode,
    path: req.path,
    method: req.method,
  });

  let statusCode = 500;
  let message = 'Internal server error';

  // Handle custom AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if ((err as any).isCustom) {
    statusCode = (err as any).statusCode || 500;
    message = (err as any).message || 'Error';
  }

  // Map specific errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
  }
  if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 409;
    message = "Duplicate entry";
  }
  if ((err as any).code === "ER_DUP_ENTRY") {
    statusCode = 409;
    message = "Duplicate database entry";
  }

  const errorResponse = {
    success: false,
    error: {
      message,
      statusCode,
    },
  };

  // Add stack only in development
  if (process.env.NODE_ENV !== "production" && err.stack) {
    (errorResponse.error as any).stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;
