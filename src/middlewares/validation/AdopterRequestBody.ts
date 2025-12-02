import * as yup from "yup"
import { Request, Response, NextFunction } from "express"
import { TypeRequestBodyAdopter } from "../../types/typesAdopter"
import { pt } from "yup-locale-pt"
import ValidateYup from "../../utils/ValidateYup"

yup.setLocale(pt)

const adopterSchemaBody: yup.ObjectSchema<
  Omit<TypeRequestBodyAdopter, "address">
> = yup.object({
  name: yup.string().required(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
      "Senha inválida"
    ),
  phone: yup
    .string()
    .required()
    .matches(
      /^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm,
      "Telefone inválido"
    ),
  photo: yup.string().optional(),
})

const validateAdopterBodyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  ValidateYup(adopterSchemaBody, req, res, next)
}
export { validateAdopterBodyMiddleware }
