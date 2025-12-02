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
    return res
      .status(201)
      .json({ data: { id: newAdopter.id, name, phone, address } })
  }
  async listAdopter(
    req: Request<TypeRequestParamsAdopter, {}, TypeRequestBodyAdopter>,
    res: Response<TypeResponseBodyAdopter>
  ) {
    const listOfAdopter = await this.AdopterRepo.listAdopter()
    const data = listOfAdopter.map((adopter) => {
      return {
        id: adopter.id,
        name: adopter.name,
        phone: adopter.phone,
        address: adopter.address !== null ? adopter.address : undefined,
      }
    })
    return res.json({ data })
  }
  async updateAdopter(
    req: Request<TypeRequestParamsAdopter, {}, TypeRequestBodyAdopter>,
    res: Response<TypeResponseBodyAdopter>
  ) {
    const { id } = req.params
    await this.AdopterRepo.updateAdopter(Number(id), req.body as AdopterEntity)
    return res.sendStatus(204)
  }
  async deleteAdopter(
    req: Request<TypeRequestParamsAdopter, {}, TypeRequestBodyAdopter>,
    res: Response<TypeResponseBodyAdopter>
  ) {
    const { id } = req.params
    await this.AdopterRepo.deleteAdopter(Number(id))
    return res.sendStatus(204)
  }
  async updateAddressAdopter(
    req: Request<TypeRequestParamsAdopter, {}, AddressEntity>,
    res: Response<TypeResponseBodyAdopter>
  ) {
    const { id } = req.params
    await this.AdopterRepo.updateAddressAdopter(Number(id), req.body)
    return res.sendStatus(204)
  }
}
