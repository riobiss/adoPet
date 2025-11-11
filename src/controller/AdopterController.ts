import { Request, Response } from "express"
import AdopterEntity from "../entities/AdopterEntities"
import AdopterRepository from "../repositories/AdopterRepository"

export default class AdopterController {
  constructor(private AdopterRepo: AdopterRepository) {}
  async createAdopter(req: Request, res: Response) {
    const { name, password, phone, address, photo } = <AdopterEntity>req.body
    const newAdopter = new AdopterEntity(name, password, phone, address, photo)
    await this.AdopterRepo.createAdopter(newAdopter)
    return res.status(200).json({ message: "Adopter Created" })
  }
  async listAdopter(req: Request, res: Response) {
    const listOfAdopter = await this.AdopterRepo.listAdopter()
    return res.status(200).json(listOfAdopter)
  }
}
