import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { clearBreadCrumb, setContentTitle, setSecondaryNav } from '../../../store/navigation/action'
import Select from 'react-select';
import ProductsList from '../../Pages/Products/ProductsList';

const ProductProducer = () => {

    const dispatch = useDispatch()
    const [installsList, setInstallsList] = useState<{label:string, value: number}[]>([])
    const [searchProduct, setsearchProduct] = useState<{value:number, label:string}>(null)

    useEffect(() => {
        dispatch(clearBreadCrumb())
        dispatch(setContentTitle('Produits'))
        dispatch(setSecondaryNav("none"))
        //InstallationsAPI.findAllInstallations({}).then(installs => setInstallsList(installs.content.map(install => ({value: install.installation.id, label: install.installation.completeAddress}))))
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
            {!!searchProduct && 
                <ProductsList/>
            }
        </>
    )
}

export default ProductProducer