import React, {useState} from 'react'
import Nav from './Nav';
import { routes } from '../../@types/common';

type Props = {
    routes: routes[],
    path: string,
    subMenus: any
}

const DashboardNavigation = (props: Props) => {

    const [isNavExtend, setIsNavExtend] = useState<boolean>(false)

    return(
        <>
            <Nav 
                routes={props.routes}
                path={props.path} 
                subMenus={props.subMenus}
                isExtend={isNavExtend}/>
        </>
    )
}

export default DashboardNavigation