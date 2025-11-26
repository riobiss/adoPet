import * as yup from "yup"
import { Request, Response, NextFunction } from "express"
import { TypeRequestBodyAdopter } from "../types/typesAdopter"
import { pt } from "yup-locale-pt"

yup.setLocale(pt)

const adopterSchemaBody: yup.ObjectSchema<
  Omit<TypeRequestBodyAdopter, "address">
> = yup.object({
  name: yup.string().required(),
  password: yup.string().required().min(8),
  phone: yup
    .string()
    .required()
    .matches(
      /^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm,
      "Invalid phone"
    ),
  photo: yup.string().optional(),
})

const validateAdopterBodyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await adopterSchemaBody.validate(req.body, {
      abortEarly: false,
    })
    return next()
  } catch (error) {
    const yupErrors = error as yup.ValidationError

    const validationErrors: Record<string, string> = {}

    yupErrors.inner.forEach(error => {
      if (!error.path) return
      validationErrors[error.path] = error.message
    })
    return res.status(400).json({ error: validationErrors })
  }
}
export { validateAdopterBodyMiddleware }
