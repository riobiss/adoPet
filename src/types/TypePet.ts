import EnumSpecies from "../enum/EnumSpecies"

type TypePet = {
  id: number
  name: string
  age: number
  species: EnumSpecies
  adopted: boolean
}
export default TypePet