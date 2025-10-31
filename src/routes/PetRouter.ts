import {Router} from "express"
import PetController from "../controller/petController"

const router = Router()

const petController = new PetController()

router.post("/", petController.createPet)
export default router 