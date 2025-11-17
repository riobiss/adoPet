import { Repository } from "typeorm"
import PetEntity from "../entities/PetEntities"
import InterfacePetRepository from "./interfaces/InterfacePetRepository"
import AdopterEntity from "../entities/AdopterEntities"
import EnumSize from "../enum/EnumSize"

export default class PetRepository implements InterfacePetRepository {
  private repository: Repository<PetEntity>
  private adopterRepo: Repository<AdopterEntity>
  constructor(
    repository: Repository<PetEntity>,
    adopterRepo: Repository<AdopterEntity>
  ) {
    this.repository = repository
    this.adopterRepo = adopterRepo
  }

  async createPet(pet: PetEntity): Promise<void> {
    await this.repository.save(pet)
  }
  async listPets(): Promise<PetEntity[]> {
    return await this.repository.find()
  }
  async updatePet(
    id: number,
    newData: PetEntity
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const petToUpdate = await this.repository.findOne({ where: { id } })
      if (!petToUpdate) {
        return { success: false, message: "Pet not found" }
      }
      Object.assign(petToUpdate, newData)
      await this.repository.save(petToUpdate)
      return { success: true, message: "Pet updated successfully" }
    } catch (error) {
      console.log(error)
      return {
        success: false,
        message: "Erro no back",
      }
    }
  }
  async deletePet(id: number): Promise<{ success: boolean; message?: string }> {
    const petToDelete = await this.repository.findOne({ where: { id } })
    if (!petToDelete) {
      return { success: false, message: "Pet not found" }
    }
    await this.repository.delete(id)
    return { success: true, message: "Pet deleted with success" }
  }
  async adoptPet(
    idPet: number,
    idAdopter: number
  ): Promise<{ success: boolean; message?: string }> {
    const pet = await this.repository.findOne({ where: { id: idPet } })
    if (!pet) {
      return { success: false, message: "Pet not found" }
    }
    const adopter = await this.adopterRepo.findOne({ where: { id: idAdopter } })
    if (!adopter) {
      return { success: false, message: "Adopter not found" }
    }
    pet.adopter = adopter
    pet.adopted = true
    await this.repository.save(pet)
    return { success: true, message: "Adopted with success" }
  }
  async searchPetByField<T extends keyof PetEntity>(
    field: T,
    value: PetEntity[T]
  ): Promise<PetEntity[]> {
    const pets = await this.repository.find({ where: { [field]: value } })
    return pets
  }
}
