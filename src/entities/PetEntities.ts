import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import EnumSpecies from "../enum/EnumSpecies"
import AdopterEntity from "./AdopterEntities"

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
  @ManyToOne(() => AdopterEntity, adopter => adopter.pets)
  adopter!: AdopterEntity
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
