import React, {useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StoragesAPI from '../../../api/StoragesAPI';
import { clearBreadCrumb, setContentTitle, setSecondaryNav } from '../../../store/navigation/action'
import Select from 'react-select';
import { UserState } from '../../../store/user/reducer';
import { CombinedStocks, ExtractStorageContent, ExtractStoragesWihStocks, ExtractStorageWithStocksContent } from '../../../@types/storages';
import ServerSideTable from '@optalp/react-server-side-table';
import useModal from '@optalp/use-modal';
import StorageForm from './../../../components/Forms/StorageForm';

const filterColumns: any[] = [
]

const sorterSelect = [
]

const StoragesList = () => {

    const columns = [
        {        
          Header: 'Nom',
          accessor: 'productName',
        },
        {        
          Header: 'Code',
          accessor: 'id.productCode',
        },
        {
          Header: 'Date d\'expiration',
          accessor: 'id.dateExpiration',
        },
        {
            Header: 'Quantité',
            accessor: 'totalQuantity',
        },
        {
          Header: 'Prix',
          accessor: 'price',
        }
    ]

    const dispatch = useDispatch()
    const [searchProduct, setsearchProduct] = useState<string>(undefined)
    const [loading, setLoading] = useState<boolean>(true)
    const ServerSideTableRef = useRef();
    const { Modal, isShowing: isModalShowed, open, close } = useModal();
    const [storagesList, setStoragesList] =  useState<{label:string, value: number}[]>([])
    const [selectedStorage, setSelectedStorage] = useState<{value:number, label:string}>(null)
    const {connectedUser} = useSelector<UserState, UserState>((state: UserState) => state)
    const [stocks, setStocks] = useState<ExtractStoragesWihStocks>(null)


    useEffect(() => {
        dispatch(clearBreadCrumb())
        dispatch(setContentTitle('Stockages'))
        dispatch(setSecondaryNav("none"))
        loadStorages()
    }, [])

    function loadStorages(){
        StoragesAPI.findAllStoragesLinkToUser(connectedUser.id)
        .then(data => setStoragesList(data.map(storage => ({value: storage.id, label: storage.name}))))
    }

    const getData = (storageId) => {
    	StoragesAPI.readStorageWithStocks(storageId)
    	.then(data => {
            //@ts-ignore
    		setStocks(data.combinedStocks)
    	})
    }

    return(
        <>
            <div style={{display: "flex", justifyContent: "center", padding: "0 20px", alignItems: "center", paddingTop: 20}}>
                <h4 className="text-center">Sélectionner l'entrepôt à visualiser</h4>
                <div style={{width: 300}}>
                    <Select 
                        options={storagesList.sort((a, b) => a.value - b.value)}
                        classNamePrefix="reactSelectInput"
                        isSearchable
                        value={selectedStorage}
                        onChange={e => {
                            setSelectedStorage(e)
                            setLoading(false)
                            getData(e.value)
                        }}/>
                </div>
                <button className="btn bg-primary" onClick={open}>Ajouter un entrepôt</button>
            </div>
            {!loading && 
                <div className="row">
                    <ServerSideTable 
                        ref={ServerSideTableRef}
                        columns={columns}
                        data={stocks}
                        isFilter
                        filtersList={filterColumns}
                        isSorter
                        sorterSelect={sorterSelect} 
                        filterParsedType="fuzzy"
                        onDataChange={() => getData(selectedStorage.value)}/>		
                </div>
            }
            <Modal
                isShowing={isModalShowed}
                hide={close}
                widthPercentage={50}
                closeOnDocumentClick
                title="Ajouter un entrepôt">
                    <StorageForm 
                        handleSubmit={e => {
                            close()
                            loadStorages()
                        }}
                        userId={connectedUser.id}
                        storageType="WAREHOUSE"/>
                </Modal>
        </>
    )
}

export default StoragesList