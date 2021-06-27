import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearBreadCrumb, setContentTitle, setSecondaryNav } from '../../../store/navigation/action'
import { rewriteMainContentBackground } from '../../../helpers/utils';
import SupermarketGeneralCount from '../../../components/Indicators/SupermarketGeneralCount';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import IndicatorsAPI, { Average } from '../../../api/IndicatorsAPI';
import { UserState } from '../../../store/user/reducer';
import ExpireProductTable from '../../../components/ExpireProductTable';
import ProductSoldCategoryUserList from '../../../components/ProductSoldCategoryUserList';
import AffluenceChart from '../../../components/AffluenceChart';
import styled from 'styled-components';

const Item = styled.div`
    flex: 1 0 21%; /* explanation below */
    margin: 10px;
    text-align: center;
`

const DashboardSupermarket = () => {

    const dispatch = useDispatch()
    const [averageConsumption, setAverageConsumption] = useState<Average>(null)
    const {connectedUser} = useSelector<UserState, UserState>((state: UserState) => state)
    const [outOfStock, setOutOfStock] = useState<any>()

    useEffect(() => {
        dispatch(clearBreadCrumb())
        dispatch(setContentTitle('Accueil'))
        dispatch(setSecondaryNav("none"))
        rewriteMainContentBackground("#e9e9e9")
    }, [])

    useEffect(() => {
        Promise.all([
            IndicatorsAPI.getAverageSupermarketConsumption(connectedUser.id),
            IndicatorsAPI.readOutOfStock(connectedUser.id)
        ])
        .then(([averageConsumption, outOfStock]) => {
            setAverageConsumption(averageConsumption)
            setOutOfStock(outOfStock)
        }) 
    }, [connectedUser])

    return(
        <>
            <SupermarketGeneralCount />
            <div className="row">
                {!!averageConsumption && !!connectedUser &&
                    <>
                        <div className="md-4">
                            <div className="card">
                                <div className={`card-title green`}>
                                    <h4 className="font-regular">Moyenne d'un panier</h4>
                                </div>
                                <div style={{width: "90%", margin: "10px auto", textAlign: "center"}}>
                                    <h3 style={{color: "#b4b4b4"}}>Prix moyen d'un panier</h3>
                                    <h1><span style={{fontSize: 30, marginRight: 10}}>{averageConsumption.price}</span><FontAwesomeIcon icon={faEuroSign} color="#27ae60"/></h1>
                                </div>
                                <br/>
                                <div style={{width: "90%", margin: "10px auto", textAlign: 'center'}}>
                                    <h3 style={{color: "#b4b4b4"}}>Panier moyen</h3>
                                    <ul style={{listStyle: "none", paddingLeft: 0, width: "inherit", margin:"0 auto"}}>
                                        {averageConsumption.products.map(product => (
                                            <li style={{padding: 15, fontSize: 16, borderBottom: "1px solid #c8c8c8"}}>{product}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="md-8">
                            <div className="card">
                                <div className={`card-title green`}>
                                    <h4 className="font-regular">Recherche par produit ou utilisateur</h4>
                                </div>
                                <ProductSoldCategoryUserList id={connectedUser.id}/>
                            </div>
                        </div>
                    </>
                }
            </div>
            <div className="row">
                <div className="md-12">
                    <div className="card">
                        <div className={`card-title green`}>
                            <h4 className="font-regular">Liste des produits périmés</h4>
                        </div>
                        {!!connectedUser && 
                            <ExpireProductTable id={connectedUser.id} />
                        }
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="md-6">
                    <div className="card">
                        <div className={`card-title green`}>
                            <h4 className="font-regular">Affluence du magasin</h4>
                        </div>
                        <AffluenceChart />
                    </div>
                </div>
                <div className="md-6">
                    <div className="card" style={{height: 460, overflowY: "auto"}}>
                        <div className={`card-title green`}>
                            <h4 className="font-regular">Produits en rupture de stock</h4>
                        </div>
                        {!!outOfStock && 
                            <div style={{display: 'flex', justifyContent: "start", flexWrap: "wrap"}}>
                                {Object.keys(outOfStock).map(key => (<Item>{outOfStock[key]}</Item>))}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardSupermarket