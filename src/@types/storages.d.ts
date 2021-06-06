import { PaginationObject } from './entities';

export type ExtractBatteryContent = {
    batteryID: {
        vendor: string,
        refNumber:string
    }
    capacity: number
    batteryHeel: number
    batteryLost: number
    batteryInitialEnergy: number
    refNumber?:number
}

export interface ExtractBatteries extends PaginationObject {
    content: ExtractBatteryContent[]
}

export type BatteryPayload = {
    refNumber: string
    vendor:string
    capacity: number
    batteryHeel: number
    batteryLost: number
    batteryInitialEnergy: number
}

export type SearchBattery = {
    size?:number
    page?:number
    sort?:string
    refNumber?:string
    vendor?:string
}