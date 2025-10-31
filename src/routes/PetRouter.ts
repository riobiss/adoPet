import { Router } from "express"
import PetController from "../controller/petController"

const router = Router()

const petController = new PetController()

router.post("/", petController.createPet)
router.get("/", petController.listPets)
router.put("/:id", petController.updatePet)

export default router
