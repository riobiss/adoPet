import * as yup from "yup"
import { Request, Response, NextFunction } from "express"
import AddressEntity from "../../entities/AddressEntities"
import { pt } from "yup-locale-pt"
import ValidateYup from "../../utils/ValidateYup"

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
  ValidateYup(addressSchemaBody, req, res, next)
}
export { validateAddressBodyMiddleware }
