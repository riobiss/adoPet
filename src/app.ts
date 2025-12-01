import "express-async-errors"
import express from "express"
import { AppDataSource } from "./config/dataSource"
import router from "./routes"
import "reflect-metadata"
import { errorMiddleware } from "./middlewares/error"

const app = express()
app.use(express.json())
router(app)

app.use(errorMiddleware)

AppDataSource.initialize()
  .then(() => {
    console.log("Connected database")
  })
  .catch((err) => {
    console.error(err)
  })

export default app
