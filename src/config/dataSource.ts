import { DataSource } from "typeorm"
import dotenv from "dotenv"
dotenv.config()

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  database: process.env.DB_PATH,
  entities: [],
  synchronize: true,
})
