import { Repository } from "typeorm"
import PetEntity from "../entities/PetEntities"
import InterfacePetRepository from "./interfaces/InterfacePetRepository"

export default class PetRepository implements InterfacePetRepository {
  private repository: Repository<PetEntity>
  constructor(repository: Repository<PetEntity>) {
    this.repository = repository
  }
  createPet(pet: PetEntity): void {
    this.repository.save(pet)
  }
  listPets(): PetEntity[] {
    throw new Error("Method not implemented")
  }
  updatePet(id: number, pet: PetEntity): void {
    throw new Error("Method not implemented")
  }
  deletePet(id: number, pet: PetEntity): void {
    throw new Error("Method not implemented")
  }
}
