import AddressEntity from "../../entities/AddressEntities"
import ShelterEntity from "../../entities/ShelterEntities"
export default interface interfaceShelterRepository {
  createShelter(shelter: ShelterEntity): void | Promise<void>
  listShelter(): Array<ShelterEntity> | Promise<ShelterEntity[]>
  updateShelter(id: number, adopter: ShelterEntity): void
  deleteShelter(id: number): void
}
