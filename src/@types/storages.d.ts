import { PaginationObject } from './entities';

export enum StorageType{
    WAREHOUSE,
    SUPERMARKET_INVENTORY,
    SUPERMARKET_SHELVES,
    FRIDGE
}

export type CombinedStocks = {
    id: {
        productCode: string,
        dateExpiration: Date
    },
    price: number,
    totalQuantity: number

}

export type ExtractStorageContent = {
    id: number
    userId: number,
    storageType: StorageType,
    name: string,
    street?: string,
    postalCode: string,
    city?: string,
    country?: string,
    latitude?: string,
    longitude?: string,
    completeAddress?: string
}

export type ExtractStorageWithStocksContent = {
    id: number
    userId: number,
    storageType: StorageType,
    name: string,
    street?: string,
    postalCode: string,
    city?: string,
    country?: string,
    latitude?: string,
    longitude?: string,
    completeAddress?: string,
    combinedStocks: ExtractStoragesWihStocks
}

export interface ExtractStoragesWihStocks extends PaginationObject {
    content: CombinedStocks[]
}

export interface ExtractStorages extends PaginationObject {
    content: ExtractStorageContent[]
}

export type StoragePayload = {
    userId: number,
    storageType: StorageType,
    name: string,
    street?: string,
    postalCode: string,
    city?: string,
    country?: string,
    latitude?: string,
    longitude?: string,
}

export type SearchStorage = {
    size?:number
    page?:number
    sort?:string
    refNumber?:string
    vendor?:string
}