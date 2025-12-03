import { Request, Response } from "express"
import ShelterEntity from "../entities/ShelterEntities"
import ShelterRepository from "../repositories/ShelterRepository"
import AddressEntity from "../entities/AddressEntities"
import {
  TypeRequestBodyShelter,
  TypeRequestParamsShelter,
  TypeResponseBodyShelter,
} from "../types/typesShelter"
import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode"

export default class ShelterController {
  constructor(private ShelterRepo: ShelterRepository) {}
  async createShelter(
    req: Request<{}, {}, TypeRequestBodyShelter>,
    res: Response<TypeResponseBodyShelter>
  ) {
    const { name, password, phone, address, email } = <ShelterEntity>req.body
    const newShelter = new ShelterEntity(name, email, password, phone)
    await this.ShelterRepo.createShelter(newShelter)
    return res
      .status(201)
      .json({ data: { id: newShelter.id, name, email, phone } })
  }
  async listShelter(
    req: Request<TypeRequestParamsShelter, {}, TypeRequestBodyShelter>,
    res: Response<TypeResponseBodyShelter>
  ) {
    const listOfShelter = await this.ShelterRepo.listShelter()
    const data = listOfShelter.map((shelter) => {
      return {
        id: shelter.id,
        name: shelter.name,
        email: shelter.email,
        phone: shelter.phone,
        address: shelter.address !== null ? shelter.address : undefined,
      }
    })
    return res.json({ data })
  }
  async updateShelter(
    req: Request<TypeRequestParamsShelter, {}, TypeRequestBodyShelter>,
    res: Response<TypeResponseBodyShelter>
  ) {
    const { id } = req.params
    await this.ShelterRepo.updateShelter(Number(id), req.body as ShelterEntity)
    return res.sendStatus(EnumHttpStatusCode.NO_CONTENT)
  }
  async deleteShelter(
    req: Request<TypeRequestParamsShelter, {}, TypeRequestBodyShelter>,
    res: Response<TypeResponseBodyShelter>
  ) {
    const { id } = req.params
    await this.ShelterRepo.deleteShelter(Number(id))
    return res.sendStatus(EnumHttpStatusCode.NO_CONTENT)
  }
  async updateAddressShelter(
    req: Request<TypeRequestParamsShelter, {}, AddressEntity>,
    res: Response<TypeResponseBodyShelter>
  ) {
    const { id } = req.params
    await this.ShelterRepo.updateAddressShelter(Number(id), req.body)
    return res.sendStatus(EnumHttpStatusCode.OK)
  }
}
