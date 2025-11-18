import AdopterEntity from "../entities/AdopterEntities"

type TypeRequestBodyAdopter = Omit<AdopterEntity, "id">

type TypeRequestParamsAdopter = { id?: string }

type TypeResponseBodyAdopter = {
  data?:
    | Pick<AdopterEntity, "id" | "name" | "phone">
    | Pick<AdopterEntity, "id" | "name" | "phone">[]
  error?: unknown
}

export {
  TypeRequestBodyAdopter,
  TypeResponseBodyAdopter,
  TypeRequestParamsAdopter,
}
