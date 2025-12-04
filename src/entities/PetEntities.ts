import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import EnumSpecies from "../enum/EnumSpecies"
import AdopterEntity from "./AdopterEntities"
import ShelterEntity from "./ShelterEntities"
import EnumSize from "../enum/EnumSize"

@Entity()
export default class PetEntity {
  @PrimaryGeneratedColumn()
  id!: number
  @Column()
  name: string
  @Column()
  species: EnumSpecies
  @Column({ nullable: true })
  size?: EnumSize
  @Column()
  dateOfBirth: Date
  @ManyToOne(() => AdopterEntity, (adopter) => adopter.pets)
  adopter!: AdopterEntity
  @ManyToOne(() => ShelterEntity, (shelter) => shelter.pets)
  shelter!: ShelterEntity
  @Column()
  adopted: boolean
  constructor(
    name: string,
    species: EnumSpecies,
    dateOfBirth: Date,
    adopted: boolean,
    size?: EnumSize
  ) {
    this.name = name
    this.species = species
    this.dateOfBirth = dateOfBirth
    this.adopted = adopted
    this.size = size
  }
}
