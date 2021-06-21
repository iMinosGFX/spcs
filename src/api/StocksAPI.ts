import axios from 'axios';
import { ExtractCombinedStocks, ExtractStockContent, SearchCombinedStocks } from '../@types/stocks';
import { API_STOCKS } from '../config/api'; 


function create(id:number, stocks:any): Promise<ExtractStockContent[]>{
    return axios.post(`${API_STOCKS}/all?storageId=${id}`, stocks)
    .then(response => response.data)
}

function findProducerStocks(producerId: number, payload: SearchCombinedStocks): Promise<ExtractCombinedStocks>{
    return axios.get(`${API_STOCKS}/producer/${producerId}`, {params:payload})
    .then(response => response.data)
}


function findSupport(payload: any): Promise<any>{
    return axios.get(`http://localhost:80/api/resources/support/find`, {
        params: payload
    })
    .then(response => response.data)
}

export default {
    create,
    findSupport,
    findProducerStocks
}