import ServerSideTable from '@optalp/react-server-side-table'
import React, {useState, useEffect} from 'react'
import IndicatorsAPI from '../api/IndicatorsAPI'

type Props = {
    id: number
}

const ProductSoldCategoryUserList = (props: Props) => {

    const [data, setData] = useState()

    const columns = [
        {
            Header: "Code produit",
            accessor: "id.productCode"
        },
        {
            Header: "Nom du produit",
            accessor: "productName"
        },
        {
            Header: "Quantité",
            accessor: "quantity"
        },
        {
            Header: "Catégorie",
            accessor: "category"
        }
    ]

    const filtersList:any = [
        {name:"categories", label:"Categorie", type:"text"},
        {name:"consumerId", label:"Id consommateur", type:"text"},
        {name:"productCode", label:"Code produit", type:"text"}
    ]

    const getData = e => {
        const {offset, perPage, filters, sorter} = e
        IndicatorsAPI.readProductSoldBy(props.id, {
            ...filters, 
            supermarketId: props.id,
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
                isFilter
                filtersList={filtersList}
                filterParsedType="fuzzy"
                withoutHeader
				onDataChange={(e) => getData(e)}/>	

        </>
    )
}

export default ProductSoldCategoryUserList