import express from "express"
import AdopterRepository from "../repositories/AdopterRepository"
import AdopterController from "../controller/AdopterController"
import { AppDataSource } from "../config/dataSource"
import { validateAdopterBodyMiddleware } from "../middlewares/AdopterRequestBody"
import { RequestHandler } from "express-serve-static-core"
const router = express.Router()

const adopterRepository = new AdopterRepository(
  AppDataSource.getRepository("AdopterEntity")
)
const adopterController = new AdopterController(adopterRepository)

const validateBody: RequestHandler = (req, res, next) =>
  validateAdopterBodyMiddleware(req, res, next)

router.post("/", validateBody, (req, res) =>
  adopterController.createAdopter(req, res)
)
router.get("/", (req, res) => adopterController.listAdopter(req, res))
router.put("/:id", (req, res) => adopterController.updateAdopter(req, res))
router.delete("/:id", (req, res) => adopterController.deleteAdopter(req, res))
router.patch("/:id", (req, res) =>
  adopterController.updateAddressAdopter(req, res)
)

export default router
