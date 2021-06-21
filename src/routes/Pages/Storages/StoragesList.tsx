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
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faRoute, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import StocksAPI from '../../../api/StocksAPI';

const filterColumns: any[] = [
]

const sorterSelect = [
]

type SelectedProduct = {
    id: {
        productCode: string,
        dateExpiration: string
    },
    price: number,
    totalQuantity: number
    quantity:number
}

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
        },
        {
            Header:"Actions",
            accessor:'',
            Cell: ({row}) => (
                <div style={{display: 'flex', alignItems:'center'}}>
                     {_.find(selectedProducts, ['id.productCode', row.original.id.productCode]) ? 
                        <button className="btn bg-red" onClick={() => handleRemoveProduct(row.original)}><FontAwesomeIcon icon={faMinus} size="lg"/></button>
                    :
                        <button className="btn bg-green" onClick={() => handleAddProduct(row.original)}><FontAwesomeIcon icon={faRoute} size="lg"/></button>
                    }
                </div>
            )
        }
    ]

    const dispatch = useDispatch()
    const [searchProduct, setsearchProduct] = useState<string>(undefined)
    const [loading, setLoading] = useState<boolean>(true)
    const ServerSideTableRef = useRef();
    const { Modal, isShowing: isModalShowed, open, close } = useModal();
    const { Modal: ModalList, isShowing: isModalListShowed, open: openList, close: closeList } = useModal();
    const [storagesList, setStoragesList] =  useState<{label:string, value: number}[]>([])
    const [selectedStorage, setSelectedStorage] = useState<{value:number, label:string}>(null)
    const {connectedUser} = useSelector<UserState, UserState>((state: UserState) => state)
    const [stocks, setStocks] = useState<ExtractStoragesWihStocks>(null)
    const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([])
    const [moveInStorageId, setMoveInStorageId] = useState<{value:number, label: string}>(null)

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

    const handleAddProduct = (product: CombinedStocks) => {
        setSelectedProducts([...selectedProducts, {
            ...product,
            quantity: 1
        }])
    }

    const handleRemoveProduct = (product: CombinedStocks) => {
        setSelectedProducts(selectedProducts.filter(p => p.id.productCode != product.id.productCode))
    }

    const handleChangeInArray = (i: number, e: any) => {
        const {value, name} = e.target;
        let _array = selectedProducts;
        _array[i][name] = value
        setSelectedProducts([..._array])
    }

    return(
        <>
            <div style={{display: "flex", justifyContent: "space-between", padding: "0 20px", alignItems: "center", paddingTop: 20}}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
                <div>
                    {selectedProducts.length > 0 && 
                        <button className="btn btn-outline-green" onClick={openList}>
                                <FontAwesomeIcon icon={faRoute} style={{paddingRight: 10}}/>
                                {selectedProducts.length} items séléctionnés
                        </button>
                    }
                </div>
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
                        storageType={connectedUser.authorities[0] === "SUPERMARKET" ? "SUPERMARKET_INVENTORY" : "WAREHOUSE"}/>
            </Modal>
            <ModalList
                    isShowing={isModalListShowed}
                    hide={closeList}
                    widthPercentage={50}
                    closeOnDocumentClick
                    title="Déplacer les articles"
                    primaryBtn
                    buttonText="Valider le déplacement"
                    primaryColor="#27ae60"
                    onBtnClick={() => {
                        StocksAPI.MoveToInventory({
                            fromStorage: selectedStorage.value,
                            toStorage: moveInStorageId.value,
                            products: selectedProducts.map(p => ({
                                quantity: p.quantity,
                                productCode: p.id.productCode,
                                dateExpiration: p.id.dateExpiration
                            }))
                        })
                        .then(() => {
                            closeList()
                            //@ts-ignore
                            ServerSideTableRef.current.reloadData()
                            setSelectedProducts([])
                            setMoveInStorageId(null)
                        })
                    }}>
                    <div style={{padding: 10}}>
                        <table className="table ">
                        <thead>
                            <tr>
                                <th>Code du produit</th>
                                <th>Date d'expiration</th>
                                <th>Quantité total</th>
                                <th>Quantité à déplacer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedProducts.length > 0 ?
                            selectedProducts.map((sproduct,i) => {
                                return(
                                    <tr key={sproduct.id.productCode}>
                                            <td>{sproduct.id.productCode}</td>
                                            <td>{sproduct.id.dateExpiration}</td>
                                            <td>{sproduct.totalQuantity}</td>
                                            <td><input type="number" step={1} name="quantity" min={0} max={sproduct.totalQuantity} value={sproduct.quantity} onChange={(e) => handleChangeInArray(i, e)}/></td>
                                    </tr>
                                )
                            }) : <p>Aucuns produits séléctionés</p>}
                        </tbody>
                    </table>
                        <Select 
                            options={storagesList.filter(s => s.value != selectedStorage?.value)}
                            value={moveInStorageId}
                            classNamePrefix="reactSelectInput"
                            onChange={e => setMoveInStorageId(e)}/>
                    </div>
            </ModalList>
        </>
    )
}

export default StoragesList