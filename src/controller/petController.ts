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
}
