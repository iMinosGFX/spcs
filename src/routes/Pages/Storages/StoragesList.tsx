import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { clearBreadCrumb, setContentTitle, setSecondaryNav } from '../../../store/navigation/action'
import Select from 'react-select';

const StoragesList = () => {

    const dispatch = useDispatch()
    const [installsList, setInstallsList] = useState<{label:string, value: number}[]>([])
    const [searchProduct, setsearchProduct] = useState<{value:number, label:string}>(null)

    useEffect(() => {
        dispatch(clearBreadCrumb())
        dispatch(setContentTitle('Stockages'))
        dispatch(setSecondaryNav("none"))
    }, [])


    return(
        <>
            <h4 style={{paddingTop: 20}} className="text-center">Rechercher un produit</h4>
            <div style={{width: "40%", margin: '0 auto'}}>
                <Select 
                    options={installsList}
                    classNamePrefix="reactSelectInput"
                    isSearchable
                    value={searchProduct}
                    onChange={e => setsearchProduct(e)}/>
            </div>
        </>
    )
}

export default StoragesList