import { Request, Response, NextFunction } from "express";
import { AppError } from "../../adapters/errors/app-error";

export function initializationError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.description,
    });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error: ${err.message}`,
  });
}
