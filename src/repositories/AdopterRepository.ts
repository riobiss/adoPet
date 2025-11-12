import { Repository } from "typeorm"
import interfaceAdopterRepository from "./interfaces/InterfaceAdopterRepository"
import AdopterEntity from "../entities/AdopterEntities"
import AddressEntity from "../entities/AddressEntities"
export default class AdopterRepository implements interfaceAdopterRepository {
  constructor(private repository: Repository<AdopterEntity>) {}

  createAdopter(adopter: AdopterEntity): void | Promise<void> {
    this.repository.save(adopter)
  }
  async listAdopter(): Promise<AdopterEntity[]> {
    return await this.repository.find()
  }
  async updateAdopter(
    id: number,
    newData: AdopterEntity
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const adopterToUpdate = await this.repository.findOne({ where: { id } })
      if (!adopterToUpdate) {
        return { success: false, message: "Adopter not found" }
      }
      Object.assign(adopterToUpdate, newData)
      await this.repository.save(adopterToUpdate)
      return { success: true, message: "Adopter updated successfully" }
    } catch (error) {
      console.log(error)
      return {
        success: false,
        message: "Erro no back",
      }
    }
  }
  async deleteAdopter(
    id: number
  ): Promise<{ success: boolean; message?: string }> {
    const adopterToDelete = await this.repository.findOne({ where: { id } })
    if (!adopterToDelete) {
      return { success: false, message: "Adopter not found" }
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
      return { success: false, message: "Adopter not found" }
    }
    const newAddress = new AddressEntity(address.city, address.state)
    adopter.address = newAddress
    await this.repository.save(adopter)
    return { success: true }
  }
}
