import express from "express"
import petRouter from "../routes/PetRouter"
import adopterRouter from "../routes/AdopterRouter"
const router = (app: express.Router) => {
 app.use("/pets", petRouter)
 app.use("/adopter", adopterRouter)
}

export default router