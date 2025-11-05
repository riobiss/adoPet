import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import EnumSpecies from "../enum/EnumSpecies"

@Entity()
export default class PetEntity {
  @PrimaryGeneratedColumn()
  id!: number
  @Column()
  name: string
  @Column()
  species: EnumSpecies
  @Column()
  dateOfBirth: Date
  @Column()
  adopted: boolean
  constructor(
    name: string,
    species: EnumSpecies,
    dateOfBirth: Date,
    adopted: boolean
  ) {
    this.name = name
    this.species = species
    this.dateOfBirth = dateOfBirth
    this.adopted = adopted
  }
}
