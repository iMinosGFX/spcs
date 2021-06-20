import { PaginationObject } from './entities';

export type ExtractStockContent = {
    price:number,
    threshold?:number,
    carbonFootprint?:number,
    dateExpiration:Date,
    dateIn?:Date,
    dateOut?:Date,
    dateShelve?:Date,
    productCode:string,
    quantity:number
}

export interface ExtractStock extends PaginationObject {
    content: ExtractStockContent[]
}

export interface ExtractCombinedStocks extends PaginationObject{
    content: ExtractCombinedStocksContent[]
}

export interface ExtractCombinedStocksContent {
    id: {
        productCode: string,
        dateExpiration: Date
    },
    productName: string,
    price: number,
    storageId: number,
    storageName: string,
    storageCity?: string,
    totalQuantity: number
}

export type SearchCombinedStocks = {
    size?:number
    page?:number
    sort?:string
    productName: string,
    storageCity?: string
}