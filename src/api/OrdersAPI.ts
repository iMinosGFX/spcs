import axios from 'axios';
import { ExtractStockContent } from '../@types/stocks';
import { API_STOCKS } from '../config/api'; 


function create(id:number, stocks:ExtractStockContent[]): Promise<ExtractStockContent[]>{
    return axios.post(`${API_STOCKS}/${id}`)
    .then(response => response.data)
}

export default {
    create,
}