import { Request, Response } from "express"
import type TypePet from "../types/TypePet"
import EnumSpecies from "../enum/EnumSpecies"
import PetRepository from "../repositories/PetRepository"
import PetEntity from "../entities/PetEntities"

let listOfPets: TypePet[] = []

let id = 0
function generateId() {
  id = id + 1
  return id
}
export default class PetController {
  constructor(private petRepo: PetRepository) {}
  createPet(req: Request, res: Response) {
    const { name, dateOfBirth, species, adopted } = <PetEntity>req.body
    if (!Object.values(EnumSpecies).includes(species)) {
      return res.status(400).json({ erro: "Species invalid" })
    }

    const newPet = new PetEntity()
    newPet.id = generateId()
    newPet.name = name
    newPet.dateOfBirth = dateOfBirth
    newPet.species = species
    newPet.adopted = adopted
    this.petRepo.createPet(newPet)
    return res.status(201).json(newPet)
  }
  async listPets(req: Request, res: Response) {
    const listOfPets = await this.petRepo.listPets()
    return res.status(200).json(listOfPets)
  }
  async updatePet(req: Request, res: Response) {
    const { id } = req.params
    const { success, message } = await this.petRepo.updatePet(
      Number(id),
      req.body as PetEntity
    )
    if (!success) {
      return res.status(404).json({ message })
    }
    return res.status(200).json({ message })
  }
  async deletePet(req: Request, res: Response) {
    const { id } = req.params
    const { success, message } = await this.petRepo.deletePet(Number(id))
    if (!success) {
      return res.status(404).json({ erro: message })
    }
    return res.status(200).json({ message })
  }
}
