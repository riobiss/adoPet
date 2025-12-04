import * as yup from "yup"
import { Request, Response, NextFunction } from "express"
import { TypeRequestBodyPet } from "../../types/typesPet"
import { pt } from "yup-locale-pt"
import EnumSpecies from "../../enum/EnumSpecies"
import EnumSize from "../../enum/EnumSize"
import ValidateYup from "../../utils/ValidateYup"

yup.setLocale(pt)

const PetSchemaBody: yup.ObjectSchema<
  Omit<TypeRequestBodyPet, "adopter" | "shelter">
> = yup.object({
  name: yup.string().required(),
  species: yup.string().oneOf(Object.values(EnumSpecies)).required(),
  size: yup.string().oneOf(Object.values(EnumSize)),
  dateOfBirth: yup.date().required(),
  adopted: yup.bool().required(),
})

const validatePetBodyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  ValidateYup(PetSchemaBody, req, res, next)
}
export { validatePetBodyMiddleware }
