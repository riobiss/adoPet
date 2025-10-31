import express from "express"

const app = express()
app.use(express.json())

app.get("/", (_, res) => {
  res.send("Bem vindo ao curso de TypeScript!")
})

function createPet(id, name, species, age, adopted) {
  return {
    id,
    name,
    species,
    age,
    adopted,
  }
}

let id = "0"
function generateId() {
  id = id + 1
  return id
}

app.post("/pets", (_, res) => {
  const pet1 = createPet(generateId(), "Bolt", "cachorro", 3, false)
  const pet2 = createPet(generateId(), "Mel", "gato", 2, false)

  res.send([pet1, pet2])
})

export default app
