import AddressEntity from "../../entities/AddressEntities"
import AdopterEntity from "../../entities/AdopterEntities"
export default interface interfaceAdopterRepository {
  createAdopter(adopter: AdopterEntity): void | Promise<void>
  listAdopter(): Array<AdopterEntity> | Promise<AdopterEntity[]>
  updateAdopter(
    id: number,
    adopter: AdopterEntity
  ): Promise<{ success: boolean; message?: string }>
  deleteAdopter(id: number): Promise<{ success: boolean; message?: string }>
  updateAddressAdopter(
    idAdopter: number,
    address: AddressEntity
  ): Promise<{ success: boolean; message?: string }>
}
