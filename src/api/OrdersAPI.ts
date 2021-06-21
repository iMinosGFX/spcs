import axios from "axios"
import { OrderPayload } from '../@types/order';
import { API_ORDERS } from './../config/api';

function createOrder(payload: OrderPayload){
    return axios.post(`${API_ORDERS}`, payload)
    .then(response => response.data)
}

export default {
    createOrder
}