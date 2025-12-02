import PetEntity from "../../entities/PetEntities"

export default interface interfacePetRepository {
  createPet(pet: PetEntity): void
  listPets(): Array<PetEntity> | Promise<PetEntity[]>
  updatePet(id: number, pet: PetEntity): void
  deletePet(id: number): void
  adoptPet(idPet: number, idAdopter: number): void
  searchPetByField<T extends keyof PetEntity>(
    field: T,
    value: PetEntity[T]
  ): Promise<PetEntity[]>
}
