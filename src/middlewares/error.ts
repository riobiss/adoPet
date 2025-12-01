import { NextFunction, Request, Response } from "express"
import { ErrorHandler } from "../utils/errorHandler"
import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode"

export const errorMiddleware = (
  erro: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = erro.statusCode ?? EnumHttpStatusCode.INTERNAL_SERVER_ERROR

  const message = erro.statusCode ? erro.message : "Erro interno no servidor"
  res.status(statusCode).json({ message })
  return next()
}
