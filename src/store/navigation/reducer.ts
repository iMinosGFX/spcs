import { GenericAction, BreadcrumbItem } from '../../@types/common';
import { SET_CONTENT_TITLE,SET_PRIMARY_NAV,SET_SECONDARY_NAV,SET_NEW_BREADCRUMB, CLEAR_BREADCRUMB, SET_DARKMODE } from './action';
import {getlocalStorageDarkMode} from "../../helpers/localStorageManagement"


export type NavigationState = {
    navigation: {
        contentTitle: string, 
        isPrimaryNavExtend: boolean, 
        secondaryNav: 'none' | 'display' | 'collapse',
        breadCrumb: BreadcrumbItem[],
        darkMode: boolean
    }
}

const initialState: NavigationState = {
    navigation:{
        contentTitle: 'Accueil',
        secondaryNav: 'none',
        isPrimaryNavExtend: false,
        breadCrumb: [{name: "Accueil", link:"/app/home", statut: "active"}],
        darkMode: getlocalStorageDarkMode() ? true : false
    }
}

export const navigationReducer = (state: NavigationState = initialState, action: GenericAction<boolean>) => {
    switch(action.type){
        case SET_CONTENT_TITLE: {
            return {...state, contentTitle: action.payload}
        }
        case SET_PRIMARY_NAV: {
            return {...state, isPrimaryNavExtend: action.payload}
        }
        case SET_SECONDARY_NAV: {
            return {...state, secondaryNav: action.payload}
        }
        case SET_NEW_BREADCRUMB: {
            return {...state, breadCrumb: action.payload}
        }
        case CLEAR_BREADCRUMB: {
            return {...state, breadCrumb: action.payload}
        }
        case SET_DARKMODE: {
            return {...state, darkMode: action.payload}
        }
        default:
            return state
    }
}
