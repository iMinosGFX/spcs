import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import OrdersAPI from '../api/OrdersAPI'
import { UserState } from '../store/user/reducer'

type Props = {
    id: number
}

const OrderListSubComponent = (props: Props) => {

    const {connectedUser} = useSelector<UserState, UserState>((state: UserState) => state)
    const [list, setList] = useState<{productName:string, quantity:number}[]>([])

    useEffect(() => {
        OrdersAPI.readOrder(props.id).then(setList)
    }, [props.id])

    return(
        <div style={{width: "90%", margin: "0 auto"}}>
            {list.map((product,i) => (
                <p key={i} style={{fontSize: 15}}>{product.productName} - {product.quantity}</p>
            ))}
        </div>
    )
}

export default OrderListSubComponent