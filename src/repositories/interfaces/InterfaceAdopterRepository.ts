import AdopterEntity from "../../entities/AdopterEntities"
export default interface interfaceAdopterRepository {
    createAdopter(adopter: AdopterEntity): void | Promise<void>
}