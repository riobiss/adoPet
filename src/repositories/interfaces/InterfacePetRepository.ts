import PetEntity from "../../entities/PetEntities"

export default interface interfacePetRepository {
  createPet(pet: PetEntity): void
  listPets(): Array<PetEntity>
  updatePet(id: number, pet: PetEntity): void
  deletePet(id: number, pet: PetEntity): void
}
