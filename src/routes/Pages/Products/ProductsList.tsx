import React, {useState, useEffect, useRef} from 'react'
import useSidebar from "@optalp/use-sidebar"
import { ExtractProducts } from '../../../@types/products';
import ProductsAPI from "../../../api/ProductsAPI"
import { FilterItem } from '../../../components/Tables/FiltersInteract';
import ServerSideTable from '@optalp/react-server-side-table';

const columns = [
    {
        Header: 'Code',
        accessor: 'code'
    },
    {
        Header: 'Nom',
        accessor: 'productName'
    },
    {
        Header: 'Quantité',
        accessor: 'quantity'
    },
    {
        Header: 'Origine',
        accessor: 'origins'
    },
    {
        Header: 'Grade',
        accessor: 'grade'
    }
]

const filters: FilterItem[] = [
]

const sorters: {value:string, label:string}[] = [
]


const ProductsList = () => {

    const { Sidebar, isShowing: isSidebarShowed, open, close } = useSidebar();
    const ServerSideTableRef = useRef();
    const [data, setData] = useState<ExtractProducts>(null)

    const getData = e => {
    	const {offset, perPage, filters, sorter} = e
    	ProductsAPI.findAllProducts({
    		...filters,
            sort: sorter,
    		size: perPage,
    		page: offset,
    	})
    	.then(data => {
    		setData(data)
    	})
    }

    return(
        <>
         <ServerSideTable 
            columns={columns}
            data={data}
            isFilter
            filtersList={filters}
            filterParsedType="fuzzy"
            onDataChange={(e) => getData(e)}/>		
        </>
    )
}

export default ProductsList