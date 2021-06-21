import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearBreadCrumb, setContentTitle, setSecondaryNav } from '../../../store/navigation/action'
import ProductsAPI from '../../../api/ProductsAPI';
import { ExtractStockContent, ExtractStock } from '../../../@types/stocks'; 
import { ExtractStorageContent } from '../../../@types/storages'; 
import StoragesAPI from '../../../api/StoragesAPI';
import StocksAPI from '../../../api/StocksAPI';
import { ExtractProductContent } from '../../../@types/products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faMinusCircle, faPlus, faPlusCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import _ from "lodash"
import useModal from "@optalp/use-modal"
import Select from 'react-select';
import { UserState } from '../../../store/user/reducer';
import { useToasts } from 'react-toast-notifications';



type createStorage = {
    price:number
    threshold:number,
    dateExpiration: string,
    productCode:string,
    quantity:number,
    productName: string
}

const ProductProducer = () => {

    const dispatch = useDispatch()
    const { addToast } = useToasts();

    const [searchProduct, setsearchProduct] = useState<string>(undefined)
    const [loading, setLoading] = useState<boolean>(true)
    const [products, setProducts] = useState<ExtractProductContent[]>([])
    const [storagesList, setStoragesList] =  useState<{label:string, value: number}[]>([])
    const [selectedStorage, setSelectedStorage] = useState<{value:number, label:string}>(null)
    const [selectedProducts, setSelectedProducts] = useState<createStorage[]>([])
    const { Modal, isShowing: isModalShowed, open, close } = useModal();
    const {connectedUser} = useSelector<UserState, UserState>((state: UserState) => state)



    useEffect(() => {
        dispatch(clearBreadCrumb())
        dispatch(setContentTitle('Produits'))
        dispatch(setSecondaryNav("none"))
        StoragesAPI.findAllStoragesLinkToUser(connectedUser.id).then(data => setStoragesList(data.map(storage => ({value: storage.id, label: storage.name}))))

    }, [])


    const handleChange = (e: any) => {
        setLoading(true)
        const value = e.target.value;
        setsearchProduct(value);
        ProductsAPI.findAllProducts({productName: value, size: 10})
        .then(data => {
            setProducts(data.content)
            setLoading(false)
        })
        .catch(e => console.log("Error : ", e))
    }

    const handleAddProduct = (product: ExtractProductContent) => {
        setSelectedProducts([...selectedProducts, {
            price: null,
            threshold:null,
            dateExpiration: null,
            productCode:product.code,
            quantity:null,
            productName: product.productName
        }]);
    }

    const handleRemoveProduct = (product: ExtractProductContent) => {
        setSelectedProducts(selectedProducts.filter(p => p.productCode != product.code))
    }

    const handleChangeInArray = (i: number, e: any) => {
        const {value, name} = e.target;
        let _array = selectedProducts;
        _array[i][name] = value
        setSelectedProducts(_array)
    }

    return(
        <>
            <div style={{display: "flex", justifyContent: "space-between", padding: "0 20px", alignItems: "center"}}>
                <div>
                    <h4 style={{paddingTop: 20}} >Rechercher un produit</h4>
                    <div style={{width: 300}}>
                        <input 
                            type="text"
                            value={searchProduct}
                            onChange={handleChange}
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
            {!loading && 
                <div className="row">
                    <table className="table striped">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nom</th>
                                <th>Marque</th>
                                <th>Code</th>
                                <th>Grade</th>
                                <th>Quantité</th>
                                <th>Origine</th>
                                <th>Ajouter</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!!products && products.map(product => {
                                return(
                                    <tr key={product.code}>
                                        <td><img src={product.imageUrl} width="70"/></td>
                                        <td>{product?.productName}</td>
                                        <td>{product?.brands}</td>
                                        <td>{product?.code}</td>
                                        <td>{product?.grade}</td>
                                        <td>{product?.quantity}</td>
                                        <td>{product?.origins}</td>
                                        {_.find(selectedProducts, ['productCode', product.code]) ?
                                        <td><span className="table-icon" data-name="Retirer" onClick={() => handleRemoveProduct(product)}><FontAwesomeIcon icon={faMinusCircle} color="#a40101"/></span></td>
                                        :
                                        <td><span className="table-icon" data-name="Ajouter" onClick={() => handleAddProduct(product)}><FontAwesomeIcon icon={faPlusCircle} color="#01a3a4"/></span></td>
                                    }
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
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
                        close()
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
                   <div style={{display: "flex", justifyContent: "space-between", margin: '0 0', paddingTop: "1%", paddingBottom: "1%"}}>
                       <div style={{width: "20%"}}>
                            <Select 
                                options={storagesList}
                                classNamePrefix="reactSelectInput"
                                isSearchable
                                value={selectedStorage}
                                onChange={e => setSelectedStorage(e)}/>
                       </div>
                    </div>
            </Modal>
        </>
    )
}

export default ProductProducer