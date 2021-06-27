import axios from "axios"
import { ExtractComments, ExtractOrders, OrderPayload } from '../@types/order';
import { API_ORDERS } from './../config/api';

function createOrder(payload: OrderPayload){
    return axios.post(`${API_ORDERS}`, payload)
    .then(response => response.data)
}

function readAllComments(id:number): Promise<ExtractComments>{
    return axios.get(`${API_ORDERS}/comments/${id}`)
    .then(response => response.data)
}

function realAllOrders(id:number): Promise<ExtractOrders>{
    return axios.get(`${API_ORDERS}/history`, {params: {supermarketId: id}})
    .then(response => response.data)
}

function readOrder(id:number): Promise<any>{
    return axios.get(`${API_ORDERS}/history/${id}`)
    .then(response => response.data)
}

export default {
    createOrder,
    readAllComments,
    realAllOrders,
    readOrder
}