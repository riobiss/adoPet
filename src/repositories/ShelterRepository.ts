import { Repository } from "typeorm"
import interfaceShelterRepository from "./interfaces/InterfaceShelterRepository"
import ShelterEntity from "../entities/ShelterEntities"
import { BadRequest, NotFound } from "../utils/errorHandler"
import AddressEntity from "../entities/AddressEntities"
export default class ShelterRepository implements interfaceShelterRepository {
  constructor(private repository: Repository<ShelterEntity>) {}

  private async ValidatePhoneShelter(phone: string) {
    return !!(await this.repository.findOne({ where: { phone } }))
  }
  private async ValidateEmailShelter(email: string) {
    return !!(await this.repository.findOne({ where: { email } }))
  }
  async createShelter(shelter: ShelterEntity): Promise<void> {
    if (
      (await this.ValidatePhoneShelter(shelter.phone)) ||
      (await this.ValidateEmailShelter(shelter.email))
    ) {
      throw new BadRequest("Phone number or email Already registered.")
    }
    await this.repository.save(shelter)
  }
  async listShelter(): Promise<ShelterEntity[]> {
    return await this.repository.find()
  }
  async updateShelter(id: number, newData: ShelterEntity) {
    const shelterToUpdate = await this.repository.findOne({ where: { id } })
    if (!shelterToUpdate) {
      throw new NotFound("Shelter not found")
    }
    Object.assign(shelterToUpdate, newData)
    await this.repository.save(shelterToUpdate)
    return { success: true, message: "Shelter updated successfully" }
  }
  async deleteShelter(id: number) {
    const shelterToDelete = await this.repository.findOne({ where: { id } })
    if (!shelterToDelete) {
      throw new NotFound("Shelter not found")
    }
    await this.repository.delete(id)
    return { success: true, message: "Shelter deleted with success" }
  }
  async updateAddressShelter(idShelter: number, address: AddressEntity) {
    const shelter = await this.repository.findOne({ where: { id: idShelter } })
    if (!shelter) {
      throw new NotFound("Shelter not found")
    }
    const newAddress = new AddressEntity(address.city, address.state)
    shelter.address = newAddress
    await this.repository.save(shelter)
    return { success: true }
  }
}
