import React,{useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { setContentTitle, setSecondaryNav, clearBreadCrumb } from '../../store/navigation/action';

const Home = () => {
  
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearBreadCrumb())
        dispatch(setContentTitle('Accueil'))
        dispatch(setSecondaryNav("none"))
    }, [])

    return(
        <div className="row">
            <h3>Coucou</h3>
        </div>
    )
}

export default Home