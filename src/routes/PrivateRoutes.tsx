import React, { useEffect, useState, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { uniqBy } from 'lodash';
import { rolesConfig } from '../config/roles';
import * as Routes from './index';
import NotFound from "./Pages/NotFound"
import Breadcrumb from '../components/Breadcrumb';
import {useSelector} from 'react-redux'
import { UserState } from '../store/user/reducer';
import { routes } from '../@types/common';
import DashboardNavigation from '../components/DashboardNavigation/DashboardNavigation';
import AuthAPI from '../api/AuthAPI';
import { NavigationState } from '../store/navigation/reducer';

const PrivateRoutes = () => {

    const [allRoutes, setAllRoutes] = useState<routes[]>([])
    const [navRoutes, setNavRoutes] = useState<routes[]>([])
    const [subMenuRoutes, setSubMenuRoutes] = useState<routes[]>([])
    const {connectedUser} = useSelector<UserState, UserState>((state: UserState) => state)
    const {navigation: {darkMode}} = useSelector<NavigationState, NavigationState>((state: NavigationState) => state)
    const {navigation: {contentTitle, secondaryNav, isPrimaryNavExtend}} = useSelector<NavigationState, NavigationState>((state: NavigationState) => state)

    useEffect(() => {
        if(!!connectedUser){
            try {
                // let roles = jwtDecode(AuthAPI.getToken())
                // roles = roles.role
                let roles = [...connectedUser.authorities, "USER"];
                
                let allowedRoutes = roles.reduce((acc, role) => {
                    return [...acc, ...rolesConfig[role].routes];
                }, []);
                allowedRoutes = uniqBy(allowedRoutes, 'url');

                let allRoutes = allowedRoutes.filter(route => route.module === 1 || route.module === 2 || route.module === 3 )
                allRoutes = uniqBy(allRoutes, 'url')

                let navRoute = allRoutes.filter(route => route.module === 1)
                navRoute = uniqBy(navRoute, 'url')

                let subMenuRoute = allRoutes.filter(route => route.module === 2)
                subMenuRoute = uniqBy(subMenuRoute, 'url')

                setAllRoutes(allRoutes)
                setNavRoutes(navRoute)
                setSubMenuRoutes(subMenuRoute)
            } catch (error) {
                AuthAPI.clearToken()
                document.location.reload()
            }
        }
    }, [connectedUser])

    return(
        <>  
            <DashboardNavigation routes={navRoutes} path={"/app"} subMenus={subMenuRoutes}/>
            <div className={`dashboard-content ${ 
                !isPrimaryNavExtend && secondaryNav === "display"  
                ? 'content-with-secondary-nav' 
                : !isPrimaryNavExtend && secondaryNav === "collapse"   
                ? 'content-with-secondary-nav-collapse' 
                : !isPrimaryNavExtend && secondaryNav === 'none' 
                ? ''
                : isPrimaryNavExtend && secondaryNav === "display"
                ? 'content-with-both-navs'
                : isPrimaryNavExtend && secondaryNav === "collapse"             
                ? 'content-with-primary-collapse'
                : 'content-with-primary-only'   
                }`}>
                <div className={`container${darkMode ? "-dark" : ""}`}>
                    <div className="dashboard-header">
                        <Breadcrumb/>
                        <h2 className="align page-title">{contentTitle}</h2>
                    </div>
                    <div id="main-content">
                        <Suspense fallback={<div>Chargement...</div>}>
                            <Switch>
                                {allRoutes.map((route)=> {
                                    return(
                                        <Route 
                                            exact
                                            key={route.url}
                                            component={Routes[route.component]}
                                            path={`/app${route.url}`}
                                        />
                                    )
                                })}
                                <Route component={NotFound} />
                            </Switch>
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PrivateRoutes