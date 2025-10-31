import { Request, Response } from "express"
import type TypePet from "../types/TypePet"

let listOfPets: TypePet[] = []

export default class PetController {
  createPet(req: Request, res: Response) {
    const { id, name, age, species, adopted } = req.body as TypePet
    const newPet: TypePet = { id, name, age, species, adopted }
    listOfPets.push(newPet)
    return res.status(201).json(newPet)
  }
  listPets(req: Request, res: Response) {
    return res.status(200).json(listOfPets)
  }
  updatePet(req: Request, res: Response) {
    const { id } = req.params
    const { name, age, species, adopted } = req.body as TypePet
    const pet = listOfPets.find(pet => pet.id === Number(id))
    if (!pet) {
      return res.status(404).json({ erro: "Pet not found" })
    }
    pet.name = name
    pet.age = age
    pet.species = species
    pet.adopted = adopted
    return res.status(200).json(pet)
  }
}
