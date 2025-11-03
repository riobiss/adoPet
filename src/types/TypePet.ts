import EnumSpecies from "../enum/EnumSpecies"

type TypePet = {
  id: number
  name: string
  dateOfBirth: Date
  species: EnumSpecies
  adopted: boolean
}
export default TypePet