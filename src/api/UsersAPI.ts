import axios from 'axios';
import { RegisterPayload, ExtractUsers, SearchUser } from '../@types/users';
import { API_USERS } from '../config/api';


function register(payload: RegisterPayload){
    return axios.post(API_USERS, payload)
    .then(response => response.data);
}


function findUsers(payload: SearchUser): Promise<ExtractUsers>{
    return axios.get(`${API_USERS}/all`, {params:payload})
    .then(response => response.data);
}

export default {
    register,
    findUsers
}