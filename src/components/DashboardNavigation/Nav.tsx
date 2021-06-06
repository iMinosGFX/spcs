import React, {useState, useEffect} from 'react'
import { faBars, faTimes, faSignOutAlt, faUserCircle, faBolt, faChevronRight, faMoon, faSun, faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux'
import { setConnectedUser } from '../../store/user/actions';
import { QuickActionModel, routes } from '../../@types/common';
import { isMobile } from "react-device-detect";
import AuthAPI from '../../api/AuthAPI';
import { useHistory } from "react-router-dom";
import _ from 'lodash'
import { UserState } from '../../store/user/reducer';
import roleMap from './../../helpers/roleMap';
//@ts-ignore
import { getQuickActionsList, toggleIsPrimaryNavExtend } from '../../helpers/localStorageManagement';
import quickActionsList from '../../config/quickActions';
import  {switchDarkMode}  from '../../helpers/localStorageManagement';
import { setDarkMode, setIsPrimaryNavExtend } from '../../store/navigation/action';
import { NavigationState } from '../../store/navigation/reducer';

type Props = {
    routes: routes[],
    subMenus?: any,
    path: string,
    isExtend: boolean
}

const Nav = (props: Props) => {

    const [isActive, setIsActive] = useState<boolean>(false)
    let location = useLocation();
    let history = useHistory();
    const dispatch = useDispatch()
    const {connectedUser} = useSelector<UserState, UserState>((state: UserState) => state)
    const [quickActions, setQuickActions] = useState<QuickActionModel[]>([])
    const {navigation: {darkMode, isPrimaryNavExtend}} = useSelector<NavigationState, NavigationState>((state: NavigationState) => state)

    function clearReduxAuth(){
        dispatch(setConnectedUser(null))
    }    
    
    const handleLogout = () => {
        AuthAPI.clearToken()
        .then(() => {
            clearReduxAuth()
            history.push('/');
        });
    };

    useEffect(() => {
        let list = getQuickActionsList()?.split(',')
        setQuickActions(quickActionsList.filter(action => list?.includes(action.id)))
    }, [])

    const toggleDarkMode = () => {
        let isDark = switchDarkMode()
        dispatch(setDarkMode(isDark))
    }

    const toggleExtend = () => {
        dispatch(setIsPrimaryNavExtend(toggleIsPrimaryNavExtend()))
    }

    return(
        <>  
        <div className={`navbar noselect ${isActive ? 'active' : ''} ${darkMode ? "navbar-dark" : ""} ${isPrimaryNavExtend ? "navbar-extend" : ""}`}>
            <div className="brand">
            </div>
            <div className="listsContainer">
                <ul className="topList">
                    {
                        props.routes.map((route,i) => {
                            if(!route.subMenu){
                                return(
                                    <li key={i} data-title={route.title} className="li-container">
                                        <Link to={`${props.path}${route.url}`} className={location.pathname.includes(route.url) ? 'active' : ''} onClick={() => isMobile && setIsActive(false)}>
                                            <span className="icon">
                                                <FontAwesomeIcon icon={route.icon} className="nav-icon"/>
                                                <span className="item-title">{route.title}</span>
                                            </span>
                                        </Link>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
                <ul className="bottomList">
                    <li className="li-container user-nav">
                        <span>
                            <span className="icon"><FontAwesomeIcon icon={faUserCircle}/></span>
                        </span>
                        <div className={`user-popup`}>
                            {connectedUser && 
                                <>
                                    <span className="user-name">{connectedUser.sub}</span>
                                    <span className="user-role">{roleMap(connectedUser.authorities[0])}</span>
                                    <div style={{display: "flex", alignContent: 'center', justifyContent: 'space-between'}}>
                                        <div className="toggle-darkmode-container">
                                            <FontAwesomeIcon icon={faSun} className="darkmode-moon" color={darkMode ? "#a4b1c0" : "#435F71"}/>
                                                <div className={`switch ${darkMode ? "dark-theme" : ""}`} onClick={toggleDarkMode}>
                                                    <span className={`btn-toggle ${darkMode ? "dark-theme" : ""}`}></span>
                                                </div>
                                            <FontAwesomeIcon icon={faMoon} className="darkmode-sun" color={darkMode ? "#435F71" : "#a4b1c0"}/>
                                        </div>
                                        <div className="toggle-navbar-container">
                                            <span>Navigation</span>
                                            <span onClick={toggleExtend}>{isPrimaryNavExtend ? "Étendu" : "Rétraicie"} <FontAwesomeIcon icon={faSync}/></span>
                                        </div>
                                    </div>

                                    <a href="#" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} size="lg" style={{paddingRight: 5}} />Déconnexion</a>
                                </>
                            }
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        {isMobile &&
            <div className="toggle-navigation" onClick={() => setIsActive(!isActive)}>
                <FontAwesomeIcon icon={isActive ? faTimes : faBars}/>
            </div>
        }
        </>
    )
}

export default Nav