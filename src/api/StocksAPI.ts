import axios from 'axios';
import { ExtractStockContent } from '../@types/stocks';
import { API_STOCKS } from '../config/api'; 


function create(id:number, stocks:any): Promise<ExtractStockContent[]>{
    return axios.post(`${API_STOCKS}/all?storageId=${id}`, stocks)
    .then(response => response.data)
}

export default {
    create,
}