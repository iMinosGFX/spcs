import React, {useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearBreadCrumb, setContentTitle, setSecondaryNav } from '../../../store/navigation/action'
import { rewriteMainContentBackground } from '../../../helpers/utils'
import { UserState } from '../../../store/user/reducer'
import OrdersAPI from '../../../api/OrdersAPI'
import { ExtractOrders } from '../../../@types/order';
import ServerSideTable from '@optalp/react-server-side-table'
import moment from "moment"
import OrderListSubComponent from '../../../components/OrderListSubComponents';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const OrdersList = () => {
    
    const dispatch = useDispatch()
    const {connectedUser} = useSelector<UserState, UserState>((state: UserState) => state)
    const ServerSideTableRef = useRef();
    const [data, setData] = useState<ExtractOrders>()

    const columns = [
        {        
            Header: 'Date de la commande',
            accessor: 'date',
            Cell: ({value}) => (
                <span>{moment(value).format("DD/MM/YYYY HH:mm")}</span>
            )
        },
        {        
            Header: 'Prix de la commande',
            accessor: 'price',
            Cell: ({value}) => (
                <span>{value} €</span>
            )
        },
        {        
            Header: "Nombre d'articles",
            accessor: 'numberOfProducts',
        },
        {        
            Header: "Emprunte carbone (CO2eq)",
            accessor: 'carbonFootprint',
        },
        {
            Header: () => null, // No header
            id: 'expander', // It needs an ID
            Cell: ({ row }) => (
              <span {...row.getToggleRowExpandedProps()}>
                {row.isExpanded ? <FontAwesomeIcon icon={faChevronUp}/> : <FontAwesomeIcon icon={faChevronDown}/>}
              </span>
            ),
          },
    ]

    useEffect(() => {
        dispatch(clearBreadCrumb())
        dispatch(setContentTitle('Liste des commandes'))
        dispatch(setSecondaryNav('none'))
        rewriteMainContentBackground('#fff')
    }, [])

    const getData = e => {
        OrdersAPI.realAllOrders(connectedUser.id)
        .then(data => 
            setData(data)
        )
    }

    useEffect(() => {
        setTimeout(() => {
            //@ts-ignore
            ServerSideTableRef?.current?.reloadData()
        }, 100)
    }, [connectedUser])

    const renderRowSubComponent = React.useCallback(
        ({row}) => (
            <OrderListSubComponent id={row.original.id}/>
        ),
        []
    )

    return(
        <>
            {!!connectedUser && 
                <ServerSideTable 
                    columns={columns}
                    data={data}
                    perPageItems={10}
                    filtersList={[]}
                    ref={ServerSideTableRef}
                    isRenderSubComponent
                    renderSubComponent={renderRowSubComponent}
                    onDataChange={(e) => getData(e)}/>
            }
        </>
    )
}

export default OrdersList