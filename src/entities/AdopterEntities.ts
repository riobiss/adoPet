import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import AddressEntity from "./AddressEntities"
import PetEntity from "./PetEntities"
import { encryptedPassword } from "../utils/encryptedPassword"

@Entity()
export default class AdopterEntity {
  @PrimaryGeneratedColumn()
  id!: number
  @Column()
  name: string
  @Column()
  password: string
  @Column()
  phone: string
  @OneToOne(() => AddressEntity, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  address?: AddressEntity
  @Column({ nullable: true })
  photo?: string
  @OneToMany(() => PetEntity, pet => pet.adopter)
  pets!: PetEntity[]
  constructor(
    name: string,
    password: string,
    phone: string,
    address?: AddressEntity,
    photo?: string
  ) {
    this.name = name
    this.password = password
    this.phone = phone
    this.address = address
    this.photo = photo
  }
  @BeforeInsert()
  @BeforeUpdate()
  private async encryptionPassword(password: string) {
    this.password = encryptedPassword(this.password)
  }
}
