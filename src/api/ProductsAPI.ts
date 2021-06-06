import axios from 'axios';
import { ExtractProducts, SearchProduct } from '../@types/products';
import { API_PRODUCTS } from '../config/api'; 


function findAllProducts(requestParams:SearchProduct): Promise<ExtractProducts>{
    return axios.get(`${API_PRODUCTS}`,{params:requestParams})
    .then(response => response.data)
}

export default {
    findAllProducts,
}