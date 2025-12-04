import { Request, Response } from "express"
import PetRepository from "../repositories/PetRepository"
import PetEntity from "../entities/PetEntities"
import {
  TypeRequestBodyPet,
  TypeRequestParamsPet,
  TypeResponseBodyPet,
} from "../types/typesPet"
import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode"

export default class PetController {
  constructor(private petRepo: PetRepository) {}
  async createPet(
    req: Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>,
    res: Response<TypeResponseBodyPet>
  ) {
    const { name, species, size, dateOfBirth, adopted } = <PetEntity>req.body
    const newPet = new PetEntity(name, species, dateOfBirth, adopted, size)
    await this.petRepo.createPet(newPet)
    return res
      .status(201)
      .json({ data: { id: newPet.id, name, species, size } })
  }
  async listPets(
    req: Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>,
    res: Response<TypeResponseBodyPet>
  ) {
    const listOfPets = await this.petRepo.listPets()
    const data = listOfPets.map((pet) => {
      return {
        id: pet.id,
        name: pet.name,
        species: pet.species,
        size: pet.size !== null ? pet.size : undefined,
      }
    })
    return res.status(200).json({ data })
  }
  async updatePet(
    req: Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>,
    res: Response<TypeResponseBodyPet>
  ) {
    const { id } = req.params
    await this.petRepo.updatePet(Number(id), req.body as PetEntity)

    return res.sendStatus(EnumHttpStatusCode.NO_CONTENT)
  }
  async deletePet(
    req: Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>,
    res: Response<TypeResponseBodyPet>
  ) {
    const { id } = req.params
    await this.petRepo.deletePet(Number(id))

    return res.sendStatus(EnumHttpStatusCode.NO_CONTENT)
  }
  async adoptPet(
    req: Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>,
    res: Response<TypeResponseBodyPet>
  ) {
    const { pet_id, adopter_id } = req.params
    await this.petRepo.adoptPet(Number(pet_id), Number(adopter_id))
    return res.sendStatus(EnumHttpStatusCode.NO_CONTENT)
  }
  async searchPetByField(req: Request, res: Response) {
    const { field, value } = req.query
    const listOfPets = await this.petRepo.searchPetByField(
      field as keyof PetEntity,
      value as any
    )
    return res.status(200).json(listOfPets)
  }
}
