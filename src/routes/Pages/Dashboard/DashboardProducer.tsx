import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { rewriteMainContentBackground } from '../../../helpers/utils'
import { clearBreadCrumb, setContentTitle, setSecondaryNav } from '../../../store/navigation/action'
import ProducerGeneralCount from '../../../components/Indicators/ProducerGeneralCount';

const DashboardProducer = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearBreadCrumb())
        dispatch(setContentTitle('Accueil'))
        dispatch(setSecondaryNav("none"))
        rewriteMainContentBackground("#e9e9e9")
    }, [])
    
    return(
        <>
            <ProducerGeneralCount />
        </>
    )
}

export default DashboardProducer