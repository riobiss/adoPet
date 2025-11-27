import * as yup from "yup"
import { Request, Response, NextFunction } from "express"
import AddressEntity from "../../entities/AddressEntities"
import { pt } from "yup-locale-pt"

yup.setLocale(pt)

const addressSchemaBody: yup.ObjectSchema<Omit<AddressEntity, "id">> =
  yup.object({
    city: yup.string().required(),
    state: yup.string().required(),
  })

const validateAddressBodyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await addressSchemaBody.validate(req.body, {
      abortEarly: false,
    })
    return next()
  } catch (error) {
    const yupErrors = error as yup.ValidationError

    const validationErrors: Record<string, string> = {}

    yupErrors.inner.forEach((error) => {
      if (!error.path) return
      validationErrors[error.path] = error.message
    })
    return res.status(400).json({ error: validationErrors })
  }
}
export { validateAddressBodyMiddleware }
