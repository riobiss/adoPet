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
  async updateAdopter(req: Request, res: Response) {
    const { id } = req.params
    const { success, message } = await this.AdopterRepo.updateAdopter(
      Number(id),
      req.body as AdopterEntity
    )
    if (!success) {
      return res.status(404).json({ message })
    }
    return res.status(200).json({ message })
  }
}
