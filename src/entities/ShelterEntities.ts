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
export default class ShelterEntity {
  @PrimaryGeneratedColumn()
  id!: number
  @Column()
  name: string
  @Column({ unique: true })
  email: string
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
  @OneToMany(() => PetEntity, (pet) => pet.shelter)
  pets!: PetEntity[]
  constructor(
    name: string,
    email: string,
    password: string,
    phone: string,
    address?: AddressEntity
  ) {
    this.name = name
    this.email = email
    this.password = password
    this.phone = phone
    this.address = address
  }
  @BeforeInsert()
  @BeforeUpdate()
  private async encryptionPassword(password: string) {
    this.password = encryptedPassword(this.password)
  }
}
