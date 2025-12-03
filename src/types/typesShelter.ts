import ShelterEntity from "../entities/ShelterEntities"

type TypeRequestBodyShelter = Omit<ShelterEntity, "id" | "pets">

type TypeRequestParamsShelter = { id?: string }

type TypeResponseBodyShelter = {
  data?:
    | Pick<ShelterEntity, "id" | "name" | "email" | "phone" | "address" >
    | Pick<ShelterEntity, "id" | "name" | "email" | "phone" | "address">[]
}

export {
  TypeRequestBodyShelter,
  TypeResponseBodyShelter,
  TypeRequestParamsShelter,
}
