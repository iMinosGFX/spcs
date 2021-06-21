import React, {useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearBreadCrumb, setContentTitle, setSecondaryNav } from '../../../store/navigation/action'
import { ExtractCombinedStocks, ExtractCombinedStocksContent } from '../../../@types/stocks'; 
import StoragesAPI from '../../../api/StoragesAPI';
import StocksAPI from '../../../api/StocksAPI';
import UsersAPI from '../../../api/UsersAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import _ from "lodash"
import useModal from "@optalp/use-modal"
import Select from 'react-select';
import { UserState } from '../../../store/user/reducer';
import { useToasts } from 'react-toast-notifications';
import ServerSideTable from '@optalp/react-server-side-table';
import OrdersAPI from "../../../api/OrdersAPI"
import { uniqBy } from 'lodash';
import { OrderItem } from '../../../@types/order';
import FieldWithoutRegister from '../../../components/Inputs/FieldWithoutRegister';

type createStorage = {
    price:number
    threshold:number,
    dateExpiration: string,
    productCode:string,
    quantity:number,
    productName: string
}

const transports = {
    "train":{
        "name": "Train",
        "carbonFootprint": 2
    },
    "car":{
        "name": "Voiture",
        "carbonFootprint": 120
    },
    "plane":{
        "name": "Avion",
        "carbonFootprint": 258
    }
}

//@ts-ignore
const filterColumns: FilterItem[] = [
    {name:"productName", label:"Nom", type:"text"},
    {name:"storageCity", label:"Ville", type:"text"},
    {name:"dateExpiration", label:"Date Expiration", type:"date"},
]

const sorterSelect = [
]

type SelectedProduct = {
    storageId: number
    productCode:string
    quantity:string,
    productName:string,
    dateExpiration: string
    price:number
    maxQuantity: number
}

const ProductSupermarket = () => {

    const dispatch = useDispatch()
    const { addToast } = useToasts();
    const {connectedUser} = useSelector<UserState, UserState>((state: UserState) => state)
    const [storagesList, setStoragesList] =  useState<{label:string, value: number}[]>([])
    const [producersList, setProducersList] = useState<{label:string, value: number}[]>([])
    const [data, setData] = useState<ExtractCombinedStocks>()
    const [selectedProducer, setSelectProducer] = useState<{value:number, label:string}>()
    const [selectedStorage, setSelectedStorage] = useState<{value:number, label:string}>(null)
    const [selectedTransport, setSelectedTransport] = useState<{value:number, label:string}>(null)
    const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([])
    const ServerSideTableRef = useRef();
    const { Modal, isShowing: isModalShowed, open, close } = useModal();
    const [distance, setDistance] = useState<string>("0")

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
          Header: 'Lieu d\'entreposage',
          accessor: 'storageCity',
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
            Header: "Ajouter",
            Cell: ({row}) => (
                <div style={{display: 'flex', alignItems:'center'}}>
                     {_.find(selectedProducts, ['productCode', row.original.id.productCode]) ? 
                        <td><button className="btn bg-red" onClick={() => handleRemoveProduct(row.original)}><FontAwesomeIcon icon={faMinus}/></button></td>
                    :
                        <td><button className="btn bg-green" onClick={() => handleAddProduct(row.original)}><FontAwesomeIcon icon={faPlus}/></button></td>
                    }
                    {/* <span className="table-icon" data-name="Ajouter" onClick={() => handleAddProduct(row.original)}><FontAwesomeIcon icon={faPlusCircle} color="#01a3a4"/></span> */}
                </div>
            )
        }
    ]

    useEffect(() => {
        dispatch(clearBreadCrumb())
        dispatch(setContentTitle('Produits'))
        dispatch(setSecondaryNav("none"))
        StoragesAPI.findAllStoragesLinkToUser(connectedUser.id).then(data => setStoragesList(data.map(storage => ({value: storage.id, label: storage.name}))))
        UsersAPI.findUsers({role: "PRODUCER"}).then(users => setProducersList(users.content.map(user => ({value: user.id, label: user.firstName}))))
    }, [])

    const getData = e => {
        const {offset, perPage, filters, sorter} = e
        StocksAPI.findProducerStocks(selectedProducer.value, {
            ...filters,
            sort: sorter ?? "",
            size: perPage,
            page: offset,
        })
        .then(data => 
            setData(data)
        )
    }

    useEffect(() => {
        setTimeout(() => {
            //@ts-ignore
            ServerSideTableRef.current.reloadData()
        }, 200)
    }, [selectedProducer])

    const handleAddProduct = (product: ExtractCombinedStocksContent) => {
        setSelectedProducts([...selectedProducts, {
            dateExpiration: product.id.dateExpiration,
            quantity: "1",
            productCode: product.id.productCode,
            storageId: product.storageId,
            price: product.price,
            productName: product.productName,
            maxQuantity: product.totalQuantity
        }])
    }

    const handleRemoveProduct = (product: ExtractCombinedStocksContent) => {
        setSelectedProducts(selectedProducts.filter(p => p.productCode != product.id.productCode))
    }

    const handleChangeInArray = (i: number, e: any) => {
        const {value, name} = e.target;
        let _array = selectedProducts;
        _array[i][name] = value
        setSelectedProducts([..._array])
    }

    return(
        <>
            <div style={{display: "flex", justifyContent: "space-between", padding: "0 20px", alignItems: "center"}}>
                <div>
                    <h4 style={{paddingTop: 20}} >Rechercher un producteur</h4>
                    <div style={{width: 300}}>
                        <Select 
                            options={producersList}
                            classNamePrefix="reactSelectInput"
                            isSearchable
                            maxMenuHeight={200}
                            value={selectedProducer}
                            onChange={e => {
                                setSelectProducer(e)
                            }}
                        />
                    </div>
                </div>
                <div>
                    <button className="btn btn-outline-green" onClick={open}>
                        <FontAwesomeIcon icon={faShoppingCart} style={{paddingRight: 10}}/>
                        {selectedProducts.length} items séléctionnés
                    </button>
                </div>
            </div>

            <div className="row">
                {!!selectedProducer && 
                    <ServerSideTable 
                        columns={columns}
                        data={data}
                        perPageItems={10}
                        isFilter
                        filtersList={filterColumns}
                        filterParsedType="fuzzy"
                        isSorter
                        sorterSelect={sorterSelect}
                        ref={ServerSideTableRef}
                        onDataChange={(e) => getData(e)}/>
                }
            </div>
           
            <Modal
                isShowing={isModalShowed}
                hide={close}
                widthPercentage={80}
                title="Liste des produits à ajouter"
                primaryBtn
                onBtnClick={() => {
                    let _array: any = {}
                    let _storagesIds = uniqBy(selectedProducts, 'storageId').map(x => x.storageId)
                    _storagesIds.map(id => {
                        let _arr = []
                        _arr.push(...selectedProducts.filter(p => p.storageId == id.toString()).map(pr => ({
                            quantity: parseInt(pr.quantity),
                            productCode: pr.productCode,
                            minDateExpiration: pr.dateExpiration
                        })))

                        _array[id] = _arr
                    })

                   OrdersAPI.createOrder({
                       supermarketId: connectedUser.id,
                       supermarketStorageId: selectedStorage.value,
                       producerId: selectedProducer.value,
                       carbonFootprint: parseInt(distance) * selectedTransport.value,
                       storages: _array
                   })
                    .then(() => {
                        addToast("Les produits ont bien été ajouté à votre stock.", {appearance: "success"})
                        setSelectedProducts([])
                        close()
                        //@ts-ignore
                        ServerSideTableRef.current.reloadData()
                    })
                    .catch(() => addToast("Une erreur est survenue pendant la création de votre stock de produits.", {appearance: "warning"}))
                }}
                buttonText="Valider"
                primaryColor="#27ae60"
                secondaryColor="#ee5253">
                   <table className="table ">
                       <thead>
                           <tr>
                               <th>Nom du produit</th>
                               <th>Prix</th>
                               <th>Quantité à ajouter</th>
                               <th>Date d'expiration</th>
                           </tr>
                       </thead>
                       <tbody>
                           {selectedProducts.length > 0 ?
                           selectedProducts.map((sproduct,i) => {
                               return(
                                   <tr key={sproduct.productCode}>
                                        <td>{sproduct.productName}</td>
                                        <td>{sproduct.price}</td>
                                        <td><input type="number" step={1} name="quantity" min={0} max={sproduct.maxQuantity} value={sproduct.quantity} onChange={(e) => handleChangeInArray(i, e)}/></td>
                                        <td><input type="date" name="dateExpiration" value={sproduct.dateExpiration} onChange={(e) => handleChangeInArray(i, e)}/></td>
                                   </tr>
                               )
                           }) : <p>Aucuns produits séléctionés</p>}
                       </tbody>
                   </table>
                   <div style={{width: '50%', margin: "0 auto", paddingTop: 20}}>
                       <div>
                           <label>Entrepôt</label>
                            <Select 
                                options={storagesList}
                                classNamePrefix="reactSelectInput"
                                isSearchable
                                value={selectedStorage}
                                onChange={e => setSelectedStorage(e)}/>
                       </div>
                       <div style={{marginTop: "1rem", display: "flex", justifyContent: "space-between"}}>
                           <div style={{display: 'flex', justifyContent: 'center', alignItems: "center", width: "20%"}}>
                                <input
                                    type="number" 
                                    min={0}
                                    step={1}
                                    value={distance}
                                    onChange={e => setDistance(e.currentTarget.value)}/>
                                <label>Kms</label>
                           </div>
                            <div style={{width: "60%"}}>
                                <Select 
                                    options={Object.entries(transports).map(([, value]) =>  ({value: value.carbonFootprint, label: value.name}))}
                                    classNamePrefix="reactSelectInput"
                                    isSearchable
                                    value={selectedTransport}
                                    placeholder="Moyen de transport"
                                    onChange={e => {
                                        setSelectedTransport(e) 
                                    }}/>
                            </div>
                        </div>
                    </div>
            </Modal>
        </>
    )
}

export default ProductSupermarket