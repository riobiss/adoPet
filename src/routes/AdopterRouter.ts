import express from "express"
import AdopterRepository from "../repositories/AdopterRepository"
import AdopterController from "../controller/AdopterController"
import { AppDataSource } from "../config/dataSource"
const router = express.Router()

const adopterRepository = new AdopterRepository(
  AppDataSource.getRepository("AdopterEntity")
)
const adopterController = new AdopterController(adopterRepository)
router.post("/", (req, res) => adopterController.createAdopter(req, res))
router.get("/", (req, res) => adopterController.listAdopter(req, res))
router.put("/:id", (req, res) => adopterController.updateAdopter(req, res))

export default router
