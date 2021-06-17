import axios from "axios"
import { ExtractStorageContent, StoragePayload } from "../@types/storages"
import { API_STORAGES } from "../config/api"

function create(storage: StoragePayload){
    return axios.post(`${API_STORAGES}`)
}

function findAllStoragesLinkToUser(userId: string): Promise<ExtractStorageContent[]>{
    return axios.get(`${API_STORAGES}/users/${userId}`).then(response => response.data)
}


function readStorageWithStocks(id: number): Promise<ExtractStorageContent[]>{
    return axios.get(`${API_STORAGES}/${id}`).then(response => response.data)
}

export default {
    create,
    findAllStoragesLinkToUser

}