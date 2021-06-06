import { PaginationObject } from './entities';

export type ExtractProductContent = {
    code: string
    productName: string
    quantity?: string
    origins?:string
    grade?:string
}

export interface ExtractProducts extends PaginationObject {
    content: ExtractProductContent[]
}


export type SearchProduct = {
    size?:number
    page?:number
    sort?:string
    productName?: string
}