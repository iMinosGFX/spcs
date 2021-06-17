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