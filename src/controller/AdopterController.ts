import { Request, Response } from "express"
import AdopterEntity from "../entities/AdopterEntities"
import AdopterRepository from "../repositories/AdopterRepository"
import AddressEntity from "../entities/AddressEntities"
import {
  TypeRequestBodyAdopter,
  TypeRequestParamsAdopter,
  TypeResponseBodyAdopter,
} from "../types/typesAdopter"

export default class AdopterController {
  constructor(private AdopterRepo: AdopterRepository) {}
  async createAdopter(
    req: Request<{}, {}, TypeRequestBodyAdopter>,
    res: Response<TypeResponseBodyAdopter>
  ) {
    const { name, password, phone, address, photo } = <AdopterEntity>req.body
    const newAdopter = new AdopterEntity(name, password, phone, address, photo)
    await this.AdopterRepo.createAdopter(newAdopter)
    return res.status(201).json({ data: { id: newAdopter.id, name, phone } })
  }
  async listAdopter(
    req: Request<TypeRequestParamsAdopter, {}, TypeRequestBodyAdopter>,
    res: Response<TypeResponseBodyAdopter>
  ) {
    const listOfAdopter = await this.AdopterRepo.listAdopter()
    const data = listOfAdopter.map(adopter => {
      return { id: adopter.id, name: adopter.name, phone: adopter.phone }
    })
    return res.json({ data })
  }
  async updateAdopter(
    req: Request<TypeRequestParamsAdopter, {}, TypeRequestBodyAdopter>,
    res: Response<TypeResponseBodyAdopter>
  ) {
    const { id } = req.params
    const { success, message } = await this.AdopterRepo.updateAdopter(
      Number(id),
      req.body as AdopterEntity
    )
    if (!success) {
      return res.status(404).json({ error: message })
    }
    return res.status(204)
  }
  async deleteAdopter(
    req: Request<TypeRequestParamsAdopter, {}, TypeRequestBodyAdopter>,
    res: Response<TypeResponseBodyAdopter>
  ) {
    const { id } = req.params
    const { success, message } = await this.AdopterRepo.deleteAdopter(
      Number(id)
    )
    if (!success) {
      return res.status(404).json({ error: message })
    }
    if (success) {
      return res.status(204)
    }
  }
  async updateAddressAdopter(
    req: Request<TypeRequestParamsAdopter, {}, TypeRequestBodyAdopter>,
    res: Response<TypeResponseBodyAdopter>
  ) {
    const { id } = req.params
    const { success, message } = await this.AdopterRepo.updateAddressAdopter(
      Number(id),
      req.body.address as AddressEntity
    )
    if (!success) {
      return res.status(404).json({ error: message })
    }
    if (success) {
      return res.status(204)
    }
  }
}
