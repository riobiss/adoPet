import { DataSource } from "typeorm"
import dotenv from "dotenv"
import PetEntity from "../entities/PetEntities"
import AdopterEntity from "../entities/AdopterEntities"
dotenv.config()

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  database: process.env.DB_PATH,
  entities: [PetEntity, AdopterEntity],
  synchronize: true,
})
