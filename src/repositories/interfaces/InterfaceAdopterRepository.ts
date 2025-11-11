import AdopterEntity from "../../entities/AdopterEntities"
export default interface interfaceAdopterRepository {
  createAdopter(adopter: AdopterEntity): void | Promise<void>
  listAdopter(): Array<AdopterEntity> | Promise<AdopterEntity[]>
  updateAdopter(id: number, adopter: AdopterEntity): void
  deleteAdopter(id: number): void
}
