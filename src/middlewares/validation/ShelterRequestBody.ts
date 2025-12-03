import * as yup from "yup"
import { Request, Response, NextFunction } from "express"
import { TypeRequestBodyShelter } from "../../types/typesShelter"
import { pt } from "yup-locale-pt"
import ValidateYup from "../../utils/ValidateYup"

yup.setLocale(pt)

const shelterSchemaBody: yup.ObjectSchema<
  Omit<TypeRequestBodyShelter, "address">
> = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
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
})

const validateShelterBodyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  ValidateYup(shelterSchemaBody, req, res, next)
}
export { validateShelterBodyMiddleware }
