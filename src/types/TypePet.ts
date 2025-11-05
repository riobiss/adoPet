import EnumSpecies from "../enum/EnumSpecies"

type TypePet = {
  id: number
  name: string
  species: EnumSpecies
  dateOfBirth: Date
  adopted: boolean
}
export default TypePet
