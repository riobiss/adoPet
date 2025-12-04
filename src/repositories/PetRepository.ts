import { Repository } from "typeorm"
import PetEntity from "../entities/PetEntities"
import InterfacePetRepository from "./interfaces/InterfacePetRepository"
import AdopterEntity from "../entities/AdopterEntities"
import { NotFound } from "../utils/errorHandler"

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
  ) {
    const petToUpdate = await this.repository.findOne({ where: { id } })
    if (!petToUpdate) {
      throw new NotFound("Pet not found")
    }
    Object.assign(petToUpdate, newData)
    await this.repository.save(petToUpdate)
    return { success: true, message: "Pet updated successfully" }
  }
  async deletePet(id: number){
    const petToDelete = await this.repository.findOne({ where: { id } })
    if (!petToDelete) {
      throw new NotFound("Pet not found")
    }
    await this.repository.delete(id)
    return { success: true, message: "Pet deleted with success" }
  }
  async adoptPet(
    idPet: number,
    idAdopter: number
  ){
    const pet = await this.repository.findOne({ where: { id: idPet } })
    if (!pet) {
      throw new NotFound("Adopter not found")
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
