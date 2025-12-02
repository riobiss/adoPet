import { Repository } from "typeorm"
import interfaceAdopterRepository from "./interfaces/InterfaceAdopterRepository"
import AdopterEntity from "../entities/AdopterEntities"
import AddressEntity from "../entities/AddressEntities"
import { BadRequest, NotFound } from "../utils/errorHandler"
export default class AdopterRepository implements interfaceAdopterRepository {
  constructor(private repository: Repository<AdopterEntity>) {}

  private async ValidatePhoneAdopter(phone: string) {
    return await this.repository.findOne({ where: { phone } })
  }
  async createAdopter(adopter: AdopterEntity): Promise<void> {
    if (await this.ValidatePhoneAdopter(adopter.phone)) {
      throw new BadRequest("Phone number already registered.")
    }
    await this.repository.save(adopter)
  }
  async listAdopter(): Promise<AdopterEntity[]> {
    return await this.repository.find()
  }
  async updateAdopter(
    id: number,
    newData: AdopterEntity
  ): Promise<{ success: boolean; message?: string }> {
    const adopterToUpdate = await this.repository.findOne({ where: { id } })
    if (!adopterToUpdate) {
      throw new NotFound("Adopter not found")
    }
    Object.assign(adopterToUpdate, newData)
    await this.repository.save(adopterToUpdate)
    return { success: true, message: "Adopter updated successfully" }
  }
  async deleteAdopter(
    id: number
  ): Promise<{ success: boolean; message?: string }> {
    const adopterToDelete = await this.repository.findOne({ where: { id } })
    if (!adopterToDelete) {
      throw new NotFound("Adopter not found")
    }
    await this.repository.delete(id)
    return { success: true, message: "Adopter deleted with success" }
  }
  async updateAddressAdopter(
    idAdopter: number,
    address: AddressEntity
  ): Promise<{ success: boolean; message?: string }> {
    const adopter = await this.repository.findOne({ where: { id: idAdopter } })
    if (!adopter) {
      throw new NotFound("Adopter not found")
    }
    const newAddress = new AddressEntity(address.city, address.state)
    adopter.address = newAddress
    await this.repository.save(adopter)
    return { success: true }
  }
}
