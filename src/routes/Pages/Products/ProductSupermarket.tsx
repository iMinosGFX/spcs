 //@ts-nocheck 

import React, {useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearBreadCrumb, setContentTitle, setSecondaryNav } from '../../../store/navigation/action'
import { ExtractCombinedStocks } from '../../../@types/stocks'; 
import StoragesAPI from '../../../api/StoragesAPI';
import StocksAPI from '../../../api/StocksAPI';
import UsersAPI from '../../../api/UsersAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import _ from "lodash"
import useModal from "@optalp/use-modal"
import Select from 'react-select';
import { UserState } from '../../../store/user/reducer';
import { useToasts } from 'react-toast-notifications';
import ServerSideTable from '../../../components/Tables/ServerSideTable';
import { FilterItem } from '../../../components/Tables/FiltersInteract';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';


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

const filterColumns: FilterItem[] = [
    {name:"productName", label:"Nom", type:"text"},
    {name:"storageCity", label:"Ville", type:"text"},
    {name:"dateExpiration", label:"Date Expiration", type:"date"},
]

const sorterSelect = [
]

const ProductSupermarket = () => {

    const dispatch = useDispatch()
    const { addToast } = useToasts();
    const {connectedUser} = useSelector<UserState, UserState>((state: UserState) => state)
    
    const [loading, setLoading] = useState<boolean>(true)

    const [storagesList, setStoragesList] =  useState<{label:string, value: number}[]>([])
    const [producersList, setProducersList] = useState<{label:string, value: number}[]>([])
    const [data, setData] = useState<ExtractCombinedStocks>(null)

    const [selectedProducer, setSelectProducer] = useState<{value:number, label:string}>()
    const [selectedStorage, setSelectedStorage] = useState<{value:number, label:string}>(null)
    const [selectedTransport, setSelectedTransport] = useState<{value:number, label:string}>(null)
    const [selectedProducts, setSelectedProducts] = useState<createStorage[]>([])
    
    const ServerSideTableRef = useRef();
    const [pageCount, setPageCount] = useState<number>(0)

    const { Modal, isShowing: isModalShowed, open, close } = useModal();

    const [params, setParams] = useState<any>()


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
                    <span className="table-icon" data-name="Ajouter"><FontAwesomeIcon icon={faPlusCircle} color="#01a3a4"/></span>
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

    



    const handleChangeInArray = (i: number, e: any) => {
        const {value, name} = e.target;
        console.log(value, name)
        let _array = selectedProducts;
        _array[i][name] = value
        setSelectedProducts(_array)
    }

    const getData = (e, producerId) => {

        if(e != null) {
            params = e
            setParams(e)
        }
        StocksAPI.findProducerStocks(producerId, {
            ...params.filters,
            size: params.perPage,
            page: params.offset
        })
        .then(data => {
            setData(data.content)
            //setPageCount(data.totalPages)
        })
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
                                console.log(`value : ${e.value}`)
                                setSelectProducer(e)
                                if(!loading) getData(null, e.value)
                                setLoading(false) 
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

            {!!selectedProducer &&
                <div className="row">
                    <ServerSideTable 
                        ref={ServerSideTableRef}
                        columns={columns}
                        data={data}
                        isFilter
                        filtersList={filterColumns}
                        isSorter
                        sorterSelect={sorterSelect}
                        filterParsedType="fuzzy"
                        onDataChange={(e) => getData(e, selectedProducer.value)}
                    />		
                </div>
            }
           
            
            <Modal
                isShowing={isModalShowed}
                hide={close}
                widthPercentage={80}
                title="Liste des produits à ajouter"
                primaryBtn


                onBtnClick={() => {
                    StocksAPI.create(selectedStorage.value, selectedProducts.map(x => {
                        return ({
                            price: x.price,
                            threshold: x.threshold,
                            dateExpiration: x.dateExpiration,
                            productCode:x.productCode,
                            quantity:x.quantity,
                        })
                    }))
                    .then(() => {
                        addToast("Les produits ont bien été ajouté à votre stock.", {appearance: "success"})
                        setSelectedProducts([])
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
                               <th>Quantité à ajouter</th>
                               <th>Prix</th>
                               <th>Seuil</th>
                               <th>Date d'expiration</th>
                           </tr>
                       </thead>
                       <tbody>
                           {selectedProducts.map((sproduct,i) => {
                               return(
                                   <tr key={sproduct.productCode}>
                                        <td>{sproduct.productName}</td>
                                        <td><input type="number" step={1} name="quantity" value={sproduct.quantity} onChange={(e) => handleChangeInArray(i, e)}/></td>
                                        <td><input type="number" name="price" value={sproduct.price} onChange={(e) => handleChangeInArray(i, e)}/></td>
                                        <td><input type="number" name="threshold" value={sproduct.threshold} onChange={(e) => handleChangeInArray(i, e)}/></td>
                                        <td><input type="date" name="dateExpiration" value={sproduct.dateExpiration} onChange={(e) => handleChangeInArray(i, e)}/></td>
                                   </tr>
                               )
                           })}
                       </tbody>
                   </table>
                   <div style={{display: "flex", justifyContent: "space-between", width: "%", margin: '0 0', paddingTop: "1%", paddingBottom: "1%"}}>
                       <div style={{width: "40%"}}>
                            <Select 
                                options={storagesList}
                                classNamePrefix="reactSelectInput"
                                isSearchable
                                value={selectedStorage}
                                onChange={e => setSelectedStorage(e)}/>
                       </div>
                       <div style={{width: "40%"}}>
                        <Select 
                                options={Object.entries(transports).map(([, value]) =>  ({value: value.carbonFootprint, label: value.name}))}
                                classNamePrefix="reactSelectInput"
                                isSearchable
                                value={selectedTransport}
                                onChange={e => {
                                    setSelectedTransport(e)
                                    console.log(e.value)    
                                }}/>
                        </div>
                    </div>
            </Modal>
        </>
    )
}

export default ProductSupermarket