import { DataSource } from "typeorm"
import dotenv from "dotenv"
import PetEntity from "../entities/PetEntities"
import AdopterEntity from "../entities/AdopterEntities"
import AddressEntity from "../entities/AddressEntities"
dotenv.config()

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  database: process.env.DB_PATH,
  entities: [PetEntity, AdopterEntity, AddressEntity],
  synchronize: true,
})