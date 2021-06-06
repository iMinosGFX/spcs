import { PaginationObject } from './entities';

export type ExtractProductContent = {
    code: string
    productName: string
    quantity?: string
    origins?:string
    grade?:string
    brands: string
    categories: string
    imageSmallUrl?: string
    imageUrl?:string
    ingredientsTextWithAllergensFr: string
    labels: string
    url?:string
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