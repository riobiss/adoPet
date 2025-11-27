import { Router } from "express"
import PetController from "../controller/PetController"
import PetRepository from "../repositories/PetRepository"
import { AppDataSource } from "../config/dataSource"
import { validatePetBodyMiddleware } from "../middlewares/validation/PetRequestBody"
import { RequestHandler } from "express-serve-static-core"

const router = Router()
const petRepository = new PetRepository(
  AppDataSource.getRepository("PetEntity"),
  AppDataSource.getRepository("AdopterEntity")
)

const validatePetBody: RequestHandler = (req, res, next) =>
  validatePetBodyMiddleware(req, res, next)

const petController = new PetController(petRepository)

router.post("/", validatePetBody, (req, res) =>
  petController.createPet(req, res)
)
router.get("/", (req, res) => petController.listPets(req, res))
router.put("/:id", (req, res) => petController.updatePet(req, res))
router.delete("/:id", (req, res) => petController.deletePet(req, res))
router.put("/:pet_id/:adopter_id", (req, res) =>
  petController.adoptPet(req, res)
)
router.get("/filter", (req, res) => petController.searchPetByField(req, res))

export default router
