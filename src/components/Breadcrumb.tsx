import React from 'react'
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
import { NavigationState } from '../store/navigation/reducer';

const Breadcrumb = () => {
    const {navigation: {breadCrumb}} = useSelector<NavigationState, NavigationState>((state: NavigationState) => state)

    return(
        <nav className="breadcrumb">
            <ul>
                {!!breadCrumb && breadCrumb.map(bread => (
                    <li key={bread.name} className={`breadcrumb-item primary ${bread.statut}`}>
                        <Link to={bread.link}>{bread.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Breadcrumb