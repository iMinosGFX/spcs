import axios from 'axios';
import { ExtractProducts, SearchProduct } from '../@types/products';
import { API_RESOURCES } from '../config/api'; 


function findAllBatteries(requestParams:SearchProduct): Promise<ExtractProducts>{
    return axios.get(`${API_RESOURCES}`,{params:requestParams})
    .then(response => response.data)
}

export default {
    findAllBatteries,
}