import { User } from '../../@types/entities';
export const SET_USER = 'SET_USER'

export function setConnectedUser(connectedUser: User){
    return{
        type: SET_USER,
        payload: connectedUser
    }
}