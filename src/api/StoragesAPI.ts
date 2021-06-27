import axios from "axios"
import { ExtractStorageContent, StoragePayload, ExtractStorageWithStocksContent, CombinedStocks, ExtractStoragesWihStocks } from "../@types/storages"
import { API_STORAGES } from "../config/api"
import { ShelvePosition } from '../routes/Pages/Map/ViewMap';

function create(storage: StoragePayload){
    return axios.post(`${API_STORAGES}`, storage)
}

function findAllStoragesLinkToUser(userId: number): Promise<ExtractStorageContent[]>{
    return axios.get(`${API_STORAGES}/users/${userId}`).then(response => response.data)
}


function readStorageWithStocks(id: number): Promise<ExtractStorageWithStocksContent>{
    return axios.get(`${API_STORAGES}/${id}`)
    .then(response => response.data)
}

function createPositions(id:number){
    return axios.post(`${API_STORAGES}/supermarket/arrangement/${id}`)
    .then(response => response.data)
}

function readPositions(id:number): Promise<any>{
    return axios.get(`${API_STORAGES}/supermarket/arrangement/${id}`)
    .then(response => response.data)
}

function updateArrangement(id:number, payload: any){
    return axios.patch(`${API_STORAGES}/supermarket/arrangement/${id}`, payload)
    .then(response => response.data)
}

function readStoragesWithoutPositions(id: number){
    return axios.get(`${API_STORAGES}/supermarket/arrangement/no-position/${id}`)
    .then(response => response.data)
}

function deleteStoragePosition(marketId:number, storageId:number){
    return axios.delete(`${API_STORAGES}/supermarket/arrangement/${marketId}`, {
        params: {
            storageId
        }
    })
    .then(response => response.data)
}

export default {
    create,
    findAllStoragesLinkToUser,
    readStorageWithStocks,
    createPositions,
    readPositions,
    updateArrangement,
    readStoragesWithoutPositions,
    deleteStoragePosition
}