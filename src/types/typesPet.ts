import PetEntity from "../entities/PetEntities"

type TypeRequestBodyPet = Omit<PetEntity, "id">

type TypeRequestParamsPet = {
  id?: string
  pet_id?: string
  adopter_id?: string
}

type TypeResponseBodyPet = {
  data?:
    | Pick<PetEntity, "id" | "name" | "species" | "size">
    | Pick<PetEntity, "id" | "name" | "species" | "size">[]
  error?: unknown
}

export { TypeRequestBodyPet, TypeResponseBodyPet, TypeRequestParamsPet }
