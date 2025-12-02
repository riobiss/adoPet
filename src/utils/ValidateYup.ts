import { NextFunction, Request, Response } from "express"
import * as yup from "yup"

const ValidateYup = (
  schema: yup.Schema<unknown>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    schema.validateSync(req.body, { abortEarly: false })
    next()
  } catch (errors) {
    const errorsYup = errors as yup.ValidationError
    const errorOfValidation: Record<string, string> = {}
    errorsYup.inner.forEach((error) => {
      if (error.path) {
        errorOfValidation[error.path] = error.message
      }
    })
    res.status(400).json({ erros: errorOfValidation })
  }
}
export default ValidateYup
