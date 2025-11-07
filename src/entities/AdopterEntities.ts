import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
  @Column()
  address?: string
  @Column()
  photo?: string
  constructor(
    name: string,
    password: string,
    phone: string,
    address?: string,
    photo?: string
  ) {
    this.name = name
    this.password = password
    this.phone = phone
    this.address = address
    this.photo = photo
  }
}
