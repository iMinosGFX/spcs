import { PaginationObject } from "./entities"

type OrderItem = {
    productCode:string,
    minDateExpiration:string,
    quantity:number
}

export type OrderPayload = {
    supermarketId:number,
    supermarketStorageId:number,
    producerId:number,
    carbonFootprint:number,
    storages: any
}

export type Comment = {
    id: number,
    consumerId: number,
    supermarketId: number,
    message: string,
    date: string
}

export type Order = {
    id:number
    price:number
    carbonFootprint: number
    date:string
    numberOfProducts: number
}

export interface ExtractComments extends PaginationObject {
    content: Comment[]
}

export interface ExtractOrders extends PaginationObject {
    content: Order[]
}