import { Request, Response } from "express"
import type TypePet from "../types/TypePet"
import EnumSpecies from "../enum/EnumSpecies"

let listOfPets: TypePet[] = []

let id = 0
function generateId() {
  id = id + 1
  return id
}
export default class PetController {
  createPet(req: Request, res: Response) {
    const { name, dateOfBirth, species, adopted } = req.body as TypePet
    if (!Object.values(EnumSpecies).includes(species)) {
      return res.status(400).json({ erro: "Species invalid" })
    }

    const newPet: TypePet = { id: generateId(), name, dateOfBirth, species, adopted }
    listOfPets.push(newPet)
    return res.status(201).json(newPet)
  }
  listPets(req: Request, res: Response) {
    return res.status(200).json(listOfPets)
  }
  updatePet(req: Request, res: Response) {
    const { id } = req.params
    const { name, dateOfBirth, species, adopted } = req.body as TypePet
    const pet = listOfPets.find(pet => pet.id === Number(id))
    if (!pet) {
      return res.status(404).json({ erro: "Pet not found" })
    }
    pet.name = name
    pet.dateOfBirth = dateOfBirth
    pet.species = species
    pet.adopted = adopted
    return res.status(200).json(pet)
  }
  deletePet(req: Request, res: Response) {
    const { id } = req.params
    const pet = listOfPets.find(pet => pet.id === Number(id))
    if (!pet) {
      return res.status(400).json({ erro: "Pet not found" })
    }
    const index = listOfPets.indexOf(pet)
    listOfPets.splice(index, 1)
    return res.status(200).json({ message: "Removed successfully" })
  }
}
