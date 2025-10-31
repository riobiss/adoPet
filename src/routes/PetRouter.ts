import { Router } from "express"
import PetController from "../controller/petController"

const router = Router()

const petController = new PetController()

router.post("/", petController.createPet)
router.get("/", petController.listPets)
router.put("/:id", petController.updatePet)
router.delete("/:id", petController.deletePet)


export default router
