import axios from 'axios';
import { RegisterPayload } from '../@types/users';
import { API_USERS } from '../config/api';


function register(payload: RegisterPayload){
    return axios.post(API_USERS, payload)
    .then(response => response.data);
}

export default {
    register
}