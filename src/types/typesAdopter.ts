import AdopterEntity from "../entities/AdopterEntities"

type TypeRequestBodyAdopter = Omit<AdopterEntity, "id" | "pets">

type TypeRequestParamsAdopter = { id?: string }

type TypeResponseBodyAdopter = {
  data?:
    | Pick<AdopterEntity, "id" | "name" | "phone" | "address">
    | Pick<AdopterEntity, "id" | "name" | "phone" | "address">[]
}

export {
  TypeRequestBodyAdopter,
  TypeResponseBodyAdopter,
  TypeRequestParamsAdopter,
}
