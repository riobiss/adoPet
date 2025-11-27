import * as yup from "yup"
import { Request, Response, NextFunction } from "express"
import { TypeRequestBodyPet } from "../../types/typesPet"
import { pt } from "yup-locale-pt"
import EnumSpecies from "../../enum/EnumSpecies"
import EnumSize from "../../enum/EnumSize"

yup.setLocale(pt)

const PetSchemaBody: yup.ObjectSchema<Omit<TypeRequestBodyPet, "adopter">> =
  yup.object({
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
  try {
    await PetSchemaBody.validate(req.body, {
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
export { validatePetBodyMiddleware }
