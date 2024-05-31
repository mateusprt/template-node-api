import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { LOGGER } from "../config";

export function handleErrorMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
  LOGGER.log({ level: 'error', message: error instanceof AppError ? error.message : 'Internal Server Error' })
  
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message })
  }
  return response.status(500).json({ message: 'Internal Server Error' })
}