import { userReducer } from './user/reducer';
import { combineReducers } from 'redux';
import { navigationReducer } from './navigation/reducer';

const rootReducer = combineReducers({
    connectedUser: userReducer,
    navigation: navigationReducer
})

export default rootReducer