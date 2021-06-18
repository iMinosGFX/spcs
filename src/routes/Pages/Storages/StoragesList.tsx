import React, {useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StoragesAPI from '../../../api/StoragesAPI';

import { clearBreadCrumb, setContentTitle, setSecondaryNav } from '../../../store/navigation/action'
import Select from 'react-select';
import { UserState } from '../../../store/user/reducer';
import { CombinedStocks, ExtractStorageContent, ExtractStoragesWihStocks, ExtractStorageWithStocksContent } from '../../../@types/storages';
import ServerSideTable from '../../../components/Tables/ServerSideTable';
import { FilterItem } from '../../../components/Tables/FiltersInteract';

const filterColumns: FilterItem[] = [
]

const sorterSelect = [
]

const StoragesList = () => {

    const columns = [
        {        
          Header: 'Code Produits',
          accessor: 'id.productCode',
        },
        {
          Header: 'Date d\'expiration',
          accessor: 'id.dateExpiration',
        },
        {
          Header: 'Prix',
          accessor: 'price',
        },
        {
          Header: 'Quantité',
          accessor: 'totalQuantity',
        }
    ]

    const dispatch = useDispatch()
    const [searchProduct, setsearchProduct] = useState<string>(undefined)
    const [loading, setLoading] = useState<boolean>(true)
    const ServerSideTableRef = useRef();
    const [data, setData] = useState<ExtractStorageWithStocksContent>(null)

    const [storagesList, setStoragesList] =  useState<{label:string, value: number}[]>([])
    const [selectedStorage, setSelectedStorage] = useState<{value:number, label:string}>(null)
    const {connectedUser} = useSelector<UserState, UserState>((state: UserState) => state)

    useEffect(() => {
        dispatch(clearBreadCrumb())
        dispatch(setContentTitle('Stockages'))
        dispatch(setSecondaryNav("none"))

        StoragesAPI.findAllStoragesLinkToUser(connectedUser.id).then(data => setStoragesList(data.map(storage => ({value: storage.id, label: storage.name}))))

    }, [])

    const getData = () => {
    	StoragesAPI.readStorageWithStocks(3)
    	.then(data => {
    		setData(data)
    	})
    }

    return(
        <>
            <div style={{display: "flex", justifyContent: "space-between", padding: "0 20px", alignItems: "center"}}>
                <h4 style={{paddingTop: 20}} className="text-center">Sélectionner l'entrepôt à visualiser</h4>
                <div style={{width: "40%", margin: '0 auto'}}>
                    <Select 
                        options={storagesList}
                        classNamePrefix="reactSelectInput"
                        isSearchable
                        value={selectedStorage}
                        onChange={e => {
                            setSelectedStorage(e)
                            setLoading(false)}
                        }/>
                </div>
            </div>
            {!loading && 
                <div className="row">
                    <ServerSideTable 
                    ref={ServerSideTableRef}
                    columns={columns}
                    data={data.combinedStocks}
                    isFilter
                    filtersList={filterColumns}
                    isSorter
                    sorterSelect={sorterSelect} 
                    showAddBtn
                    filterParsedType="fuzzy"
                    onAddClick={open}
                    onDataChange={() => getData()}/>		
                </div>
            }
        </>
    )
}

export default StoragesList