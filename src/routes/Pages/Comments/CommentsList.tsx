import React, {useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearBreadCrumb, setContentTitle, setSecondaryNav } from '../../../store/navigation/action'
import { rewriteMainContentBackground } from '../../../helpers/utils'
import moment from 'moment'
import { ExtractOrders, ExtractComments } from '../../../@types/order';
import { UserState } from '../../../store/user/reducer'
import OrdersAPI from '../../../api/OrdersAPI'
import ServerSideTable from '@optalp/react-server-side-table'

const CommentsList = () => {
    const dispatch = useDispatch()
    const {connectedUser} = useSelector<UserState, UserState>((state: UserState) => state)
    const ServerSideTableRef = useRef();
    const [data, setData] = useState<ExtractComments>()

    const columns = [
        {        
            Header: 'Id du consommateur',
            accessor: 'consumerId',
        },
        {        
            Header: "Date du commentaire",
            accessor: 'date',
            Cell: ({value}) => (
                <span>{moment(value).format("DD/MM/YYYY HH:mm")}</span>
            )
        },
        {        
            Header: "Message du commentaire",
            accessor: 'message',
        },
    ]
    
    useEffect(() => {
        dispatch(clearBreadCrumb())
        dispatch(setContentTitle('Liste des commentaires'))
        dispatch(setSecondaryNav('none'))
        rewriteMainContentBackground('#fff')
    }, [])

    const getData = e => {
        OrdersAPI.readAllComments(connectedUser.id)
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

    return(
        <>
        {!!connectedUser && 
                <ServerSideTable 
                    columns={columns}
                    data={data}
                    perPageItems={10}
                    filtersList={[]}
                    ref={ServerSideTableRef}
                    onDataChange={(e) => getData(e)}/>
            }
        </>
    )
}

export default CommentsList