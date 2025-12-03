import express from "express"
import ShelterRepository from "../repositories/ShelterRepository"
import ShelterController from "../controller/ShelterController"
import { AppDataSource } from "../config/dataSource"
import { validateShelterBodyMiddleware } from "../middlewares/validation/ShelterRequestBody"
import { RequestHandler } from "express-serve-static-core"
import { validateAddressBodyMiddleware } from "../middlewares/validation/AddressRequestBody"
import { verifyIdMiddleware } from "../middlewares/validation/verifyId"
const router = express.Router()

const shelterRepository = new ShelterRepository(
  AppDataSource.getRepository("ShelterEntity")
)
const shelterController = new ShelterController(shelterRepository)

const validateShelterBody: RequestHandler = (req, res, next) =>
  validateShelterBodyMiddleware(req, res, next)

const validateAddressBody: RequestHandler = (req, res, next) =>
  validateAddressBodyMiddleware(req, res, next)

router.post("/", validateShelterBody, (req, res) =>
  shelterController.createShelter(req, res)
)
router.get("/", (req, res) => shelterController.listShelter(req, res))
router.put("/:id", verifyIdMiddleware, (req, res) =>
  shelterController.updateShelter(req, res)
)
router.delete("/:id", verifyIdMiddleware, (req, res) =>
  shelterController.deleteShelter(req, res)
)
router.patch("/:id", verifyIdMiddleware, validateAddressBody, (req, res) =>
  shelterController.updateAddressShelter(req, res)
)
export default router
