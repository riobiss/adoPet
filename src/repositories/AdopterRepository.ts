import { Repository } from "typeorm"
import interfaceAdopterRepository from "./interfaces/InterfaceAdopterRepository"
import AdopterEntity from "../entities/AdopterEntities"
export default class AdopterRepository implements interfaceAdopterRepository {
  constructor(private repository: Repository<AdopterEntity>) {}

  createAdopter(adopter: AdopterEntity): void | Promise<void> {
    this.repository.save(adopter)
  }
  async listAdopter(): Promise<AdopterEntity[]> {
    return await this.repository.find()
  }
}
