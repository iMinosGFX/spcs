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