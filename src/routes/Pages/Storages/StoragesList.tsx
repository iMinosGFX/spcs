import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StoragesAPI from '../../../api/StoragesAPI';

import { clearBreadCrumb, setContentTitle, setSecondaryNav } from '../../../store/navigation/action'
import Select from 'react-select';
import { UserState } from '../../../store/user/reducer';

const StoragesList = () => {

    const dispatch = useDispatch()
    const [searchProduct, setsearchProduct] = useState<string>(undefined)
    const [loading, setLoading] = useState<boolean>(true)
    // const [products, setProducts] = useState<ExtractProductContent[]>([])    

    const [storagesList, setStoragesList] =  useState<{label:string, value: number}[]>([])
    const [selectedStorage, setSelectedStorage] = useState<{value:number, label:string}>(null)
    const {connectedUser} = useSelector<UserState, UserState>((state: UserState) => state)

    useEffect(() => {
        dispatch(clearBreadCrumb())
        dispatch(setContentTitle('Stockages'))
        dispatch(setSecondaryNav("none"))

        StoragesAPI.findAllStoragesLinkToUser(connectedUser.id).then(data => setStoragesList(data.map(storage => ({value: storage.id, label: storage.name}))))

    }, [])

    return(
        <>
            <h4 style={{paddingTop: 20}} className="text-center">Sélectionner l'entrepôt à visualiser</h4>
            <div style={{width: "40%", margin: '0 auto'}}>
                <Select 
                     options={storagesList}
                     classNamePrefix="reactSelectInput"
                     isSearchable
                     value={selectedStorage}
                     onChange={e => setSelectedStorage(e)}/>
            </div>
        </>
    )
}

export default StoragesList