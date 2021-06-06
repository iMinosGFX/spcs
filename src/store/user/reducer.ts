import { User} from '../../@types/entities';
import { GenericAction } from '../../@types/common';
import {SET_USER} from './actions'

export interface UserState {
    connectedUser: User
}

const initialState = {connectedUser:{}}

export const userReducer = (state: UserState = initialState, action: GenericAction<User>) => {
    switch(action.type){
        case SET_USER: {
            return action.payload
        }
        default:
            return state
    }
}
