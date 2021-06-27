import axios from "axios"
import { Count } from "../components/Indicators/SupermarketGeneralCount"
import { API_INDICATORS } from "../config/api"
import { CountProducer } from '../components/Indicators/ProducerGeneralCount';
import { findSourceMap } from "module";

function readAllSupermarketCount(id:number): Promise<Count>{
    return Promise.all([
        axios.get(`${API_INDICATORS}/supermarket/sales/${id}`),
        axios.get(`${API_INDICATORS}/supermarket/clients/${id}`),
        axios.get(`${API_INDICATORS}/supermarket/comments/${id}`),
        axios.get(`${API_INDICATORS}/supermarket/carbon-footprint/${id}`),
    ])
    .then(([sales, clients, comments, carbon]) => {
        return {
            totalSales: sales.data,
            numberClients: clients.data,
            numberComments: comments.data,
            carbonFootprint: carbon.data
        }
    })
}


function readAllProducerCount(id:number): Promise<CountProducer>{
    return Promise.all([
        axios.get(`${API_INDICATORS}/producer/sales/${id}`),
        axios.get(`${API_INDICATORS}/producer/clients/${id}`)
    ])
    .then(([sales, clients]) => {
        return {
            totalSales: sales.data,
            numberClients: clients.data
        }
    })
}

export type Average = {
    price: number
    products: string[]
}

function getAverageSupermarketConsumption(id:number): Promise<Average>{
    return axios.get(`${API_INDICATORS}/supermarket/average-cart/${id}`)
    .then(response => response.data)
}

function readExpiredProducts(id:number, payload: any): Promise<any>{
    return axios.get(`${API_INDICATORS}/products/expired/${id}`)
    .then(response => response.data)
}

function readProductSoldBy(id:number, payload:any): Promise<any>{
    return axios.get(`${API_INDICATORS}/supermarket/analysis`, {params: payload})
    .then(response => response.data)
}

function readOutOfStock(id: number): Promise<Map<string,string>[]>{
    return axios.get(`${API_INDICATORS}/products/out-stock/${id}`)
    .then(response => response.data)
}

export default {
    readAllSupermarketCount,
    getAverageSupermarketConsumption,
    readAllProducerCount,
    readExpiredProducts,
    readProductSoldBy,
    readOutOfStock
}