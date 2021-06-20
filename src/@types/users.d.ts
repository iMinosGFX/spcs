import { PaginationObject } from "./entities"

export enum Roles {
    ADMIN,
    SUPERMARKET,
    PRODUCER,
    CONSUMER
}

export type RegisterPayload = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone:string,
    bic:string,
    iban:string,
    siret:string,
    role: string
}

export type ExtractUsersContent = {
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?:string,
    bic?:string,
    iban?:string,
    siret?:string,
    role: string
}

export interface ExtractUsers extends PaginationObject {
    content: ExtractUsersContent[]
}

export type SearchUser = {
    size?:number
    page?:number
    sort?:string
    firstName?: string
    role?: string
}