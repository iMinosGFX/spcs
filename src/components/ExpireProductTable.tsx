import React, {useState, useEffect} from 'react'
import ServerSideTable from '@optalp/react-server-side-table';
import IndicatorsAPI from "../api/IndicatorsAPI"

type Props = {
    id: number
}

const ExpireProductTable = (props: Props) => {

    const [data, setData] = useState<any>()

    const columns = [
        {
            Header: 'Nom du produit',
            accessor: 'productName'
        },
        {
            Header: 'Prix',
            accessor: 'price'
        },
        {
            Header: 'Entrepôt',
            accessor: 'storageName'
        },
        {
            Header: 'Quantité totale',
            accessor: 'totalQuantity'
        },
    ]

    const getData = e => {
        const {offset, perPage, filters, sorter} = e
        IndicatorsAPI.readExpiredProducts(props.id, {
            ...filters, 
            sort: sorter ?? "",
            size: perPage,
            page:offset,
        })
		.then(setData)
    }

    return(
        <>
            <ServerSideTable 
				columns={columns}
				data={data}
                perPageItems={50}
                filtersList={[]}
                filterParsedType="fuzzy"
                withoutHeader
				onDataChange={(e) => getData(e)}/>		
        </>
    )
}

export default ExpireProductTable