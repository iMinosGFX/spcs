import { BreadcrumbItem } from '../../@types/common';
export const SET_CONTENT_TITLE = 'SET_CONTENT_TITLE'
export const SET_PRIMARY_NAV = 'SET_PRIMARY_NAV'
export const SET_SECONDARY_NAV = 'SET_SECONDARY_NAV'
export const SET_NEW_BREADCRUMB = 'SET_NEW_BREADCRUMB'
export const CLEAR_BREADCRUMB = 'CLEAR_BREADCRUMB'
export const SET_DARKMODE = 'SET_DARKMODE'

export function setContentTitle(payload: string){
    return{
        type: SET_CONTENT_TITLE,
        payload: payload
    }
}

export function setIsPrimaryNavExtend(payload: boolean){
    console.log(payload)
    return{
        type: SET_PRIMARY_NAV,
        payload: payload
    }
}

export function setSecondaryNav(payload: 'display' | 'none' | 'collapse'){
    return{
        type: SET_SECONDARY_NAV,
        payload: payload
    }
}

export function setNewBreadCrumb(breadcumb: BreadcrumbItem[]){
    return{
        type: SET_NEW_BREADCRUMB,
        payload: [{name: "Accueil", link:"/app/home", statut: ""}, ...breadcumb]
    }
}

export function clearBreadCrumb(){
    return{
        type: CLEAR_BREADCRUMB,
        payload: [{name: "Accueil", link:"/app/home", statut: "active"}]
    }
}

export function setDarkMode(isDarkMode: boolean){
    return{
        type: SET_DARKMODE,
        payload: isDarkMode
    }
}