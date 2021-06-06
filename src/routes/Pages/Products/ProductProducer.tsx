import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { clearBreadCrumb, setContentTitle, setSecondaryNav } from '../../../store/navigation/action'
import Select from 'react-select';
import ProductsAPI from '../../../api/ProductsAPI';
import { ExtractProductContent } from '../../../@types/products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import _ from "lodash"
import useModal from "@optalp/use-modal"

type createStorage = {
    price:number
    threshold:number,
    carbonFootprint:number,
    dateExpiration: string,
    productCode:string,
    quantity:number,
    productName: string
}

const ProductProducer = () => {

    const dispatch = useDispatch()
    const [searchProduct, setsearchProduct] = useState<string>(undefined)
    const [loading, setLoading] = useState<boolean>(true)
    const [products, setProducts] = useState<ExtractProductContent[]>([])
    const [selectedProducts, setSelectedProducts] = useState<createStorage[]>([])
    const { Modal, isShowing: isModalShowed, open, close } = useModal();

    useEffect(() => {
        dispatch(clearBreadCrumb())
        dispatch(setContentTitle('Produits'))
        dispatch(setSecondaryNav("none"))
        //InstallationsAPI.findAllInstallations({}).then(installs => setInstallsList(installs.content.map(install => ({value: install.installation.id, label: install.installation.completeAddress}))))
    }, [])


    const handleChange = (e: any) => {
        setLoading(true)
        const {value} = e.target.value;
        setsearchProduct(value);
        ProductsAPI.findAllProducts({productName: value, size: 10})
        .then(data => {
            setProducts(data.content)
            setLoading(false)
        })
        .catch(e => console.log("Error : ", e))
        //TODO: Call API with value
    }

    const handleAddProduct = (product: ExtractProductContent) => {
        setSelectedProducts([...selectedProducts, {
            price: null,
            threshold:null,
            carbonFootprint:null,
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
        console.log(value, name)
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
                                            <td><button className="btn bg-red" onClick={() => handleRemoveProduct(product)}><FontAwesomeIcon icon={faMinus}/></button></td>
                                        :
                                            <td><button className="btn bg-green" onClick={() => handleAddProduct(product)}><FontAwesomeIcon icon={faPlus}/></button></td>
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
                onBtnClick={() => console.log(selectedProducts)}
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
                               <th>Emprunte carbone</th>
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
                                        <td><input type="number" name="carbonFootprint" value={sproduct.carbonFootprint} onChange={(e) => handleChangeInArray(i, e)}/></td>
                                        <td><input type="date" name="dateExpiration" value={sproduct.dateExpiration} onChange={(e) => handleChangeInArray(i, e)}/></td>
                                   </tr>
                               )
                           })}
                       </tbody>
                   </table>
            </Modal>
        </>
    )
}

export default ProductProducer