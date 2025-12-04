import express from "express"
import petRouter from "../routes/PetRouter"
import adopterRouter from "../routes/AdopterRouter"
import shelterRouter from "../routes/ShelterRouter"
const router = (app: express.Router) => {
 app.use("/pets", petRouter)
 app.use("/adopter", adopterRouter)
 app.use("/shelter", shelterRouter)

}

export default router