import { Request, Response } from "express"

let listOfPets = []

export default class PetController {
  createPet(req: Request, res: Response) {
    const newPet = req.body
    listOfPets.push(newPet)
    return res.status(201).json(newPet)
  }
}
