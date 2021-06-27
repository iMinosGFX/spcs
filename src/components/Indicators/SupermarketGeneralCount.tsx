import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import IndicatorsAPI from '../../api/IndicatorsAPI'
import { UserState } from '../../store/user/reducer'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faFileInvoiceDollar, faGlobe, faUserFriends } from '@fortawesome/free-solid-svg-icons';

export type Count = {
    totalSales: number
    numberClients: number
    numberComments: number
    carbonFootprint: number
}

const Container = styled("div")`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 120px;
    .divider{
        width: 1px;
        height: 80px;
        background: #dfdfdf;
        display: block;
    }
`

const Item = styled("div")<{color?: string}>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    position: relative;
    h2{
        color: #435F71;
        font-weight: 600;
        text-align: left;
        span{
            font-size: 1rem;
            font-weight: 400;
            font-style: italic;
            margin-left: 5px;
            color: #9fa8ad;
        }
    }
    h4{
        color: #b4b4b4;
        font-weight: 400;
        font-size: 1.2rem;
    }
`


const SupermarketGeneralCount = () => {
    
    const {connectedUser} = useSelector<UserState, UserState>((state: UserState) => state)

    const [count, setCount] = useState<Count>({
        totalSales: 0,
        numberClients: 0,
        numberComments: 0,
        carbonFootprint: 0
    })

    useEffect(() => {
        IndicatorsAPI.readAllSupermarketCount(connectedUser.id).then(setCount)
    }, [connectedUser])

    return(
        <div className="row">
            <div className="md-12">
                <div className="card">
                    <Container>
                        <Item>
                            <div>
                                <h2><FontAwesomeIcon style={{marginRight: 5}} icon={faFileInvoiceDollar} color="#191C4D"/> {count.totalSales} </h2>
                                <h4>Total ventes</h4>
                            </div>
                        </Item>
                        <div className="divider"></div>
                        <Item>
                            <div>
                                <h2><FontAwesomeIcon style={{marginRight: 5}} icon={faUserFriends} color="#ff9f43"/> {count.numberClients}</h2>
                                <h4>Nombre de clients</h4>
                            </div>
                        </Item>
                        <div className="divider"></div>
                        <Item>
                            <div>
                                <h2><FontAwesomeIcon style={{marginRight: 5}} icon={faComment} color="#435F71"/> {count.numberComments}</h2>
                                <h4>Nombre de commentaires</h4>
                            </div>
                        </Item>
                        <div className="divider"></div>
                        <Item>
                            <div>
                                <h2><FontAwesomeIcon style={{marginRight: 5}} icon={faGlobe} color="#27ae60"/> {count.carbonFootprint} <span style={{fontSize: 16}}>CO2eq</span></h2>
                                <h4>Empruntes carbone</h4>
                            </div>
                        </Item>
                    </Container>
                </div>
            </div>

        </div>
    )
}

export default SupermarketGeneralCount