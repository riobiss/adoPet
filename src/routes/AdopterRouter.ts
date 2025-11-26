import express from "express"
import AdopterRepository from "../repositories/AdopterRepository"
import AdopterController from "../controller/AdopterController"
import { AppDataSource } from "../config/dataSource"
import { validateAdopterBodyMiddleware } from "../middlewares/AdopterRequestBody"
import { RequestHandler } from "express-serve-static-core"
import { validateAddressBodyMiddleware } from "../middlewares/AddressRequestBody"
const router = express.Router()

const adopterRepository = new AdopterRepository(
  AppDataSource.getRepository("AdopterEntity")
)
const adopterController = new AdopterController(adopterRepository)

const validateAdopterBody: RequestHandler = (req, res, next) =>
  validateAdopterBodyMiddleware(req, res, next)

const validateAddressBody: RequestHandler = (req, res, next) =>
  validateAddressBodyMiddleware(req, res, next)

router.post("/", validateAdopterBody, (req, res) =>
  adopterController.createAdopter(req, res)
)
router.get("/", (req, res) => adopterController.listAdopter(req, res))
router.put("/:id", (req, res) => adopterController.updateAdopter(req, res))
router.delete("/:id", (req, res) => adopterController.deleteAdopter(req, res))
router.patch("/:id", validateAddressBody, (req, res) =>
  adopterController.updateAddressAdopter(req, res)
)

export default router
