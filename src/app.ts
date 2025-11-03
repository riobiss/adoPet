import express from "express"
import { AppDataSource } from "./config/dataSource"
import router from "./routes"
import "reflect-metadata"

const app = express()
app.use(express.json())
router(app)

AppDataSource.initialize()
  .then(() => {
    console.log("Connected database")
  })
  .catch(err => {
    console.error(err)
  })

export default app
