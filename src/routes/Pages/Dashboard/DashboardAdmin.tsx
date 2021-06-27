import React, {useState, useEffect} from 'react'
import StoragesAPI from '../../../api/StoragesAPI'
import UsersAPI from '../../../api/UsersAPI'
import { clearBreadCrumb, setContentTitle, setSecondaryNav } from '../../../store/navigation/action'
import { useDispatch } from 'react-redux';

const DashboardAdmin = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearBreadCrumb())
        dispatch(setContentTitle('Accueil'))
        dispatch(setSecondaryNav("none"))
    }, [])
    
    return(
        <>
            <p>Dashboard admin</p>
        </>
    )
}

export default DashboardAdmin