import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import _ from 'lodash';
import quickActionsList from './../../config/quickActions';
import { UserState } from '../../store/user/reducer';
import { setQuickActionsList, getQuickActionsList } from '../../helpers/localStorageManagement';

const ListContainer = styled.div`

`

const ParameterProfile = () => {

    const [checkedOptions, setCheckedOptions] = useState([])
    const {connectedUser} = useSelector<UserState, UserState>((state: UserState) => state)

    useEffect(() => {
        setCheckedOptions(getQuickActionsList().split(','))
    }, [])

    const onSubmit = () => {
        setQuickActionsList(checkedOptions.join(','))
        location.reload(false)
    }

    return(
        <div className="setting-container">
            <h2 className="text-center">Mon compte</h2>
            <h3>Gérer mes actions rapides</h3>
            <p>Vous pouvez gérer l'affichage des actions rapides possibles depuis l'icône <FontAwesomeIcon icon={faBolt}/> dans la barre de navigation</p>
            {!!connectedUser && 
                <ListContainer>
                    <ul className="switches">
                        {quickActionsList.filter(action => action.roles.includes(connectedUser.role)).map(action => (
                            <li key={action.id}>
                                <input type="checkbox" id={action.id} checked={checkedOptions.includes(action.id)} onChange={() => setCheckedOptions(_.xor(checkedOptions, [action.id]))}/>
                                <label htmlFor={action.id}>
                                <span>{action.title}</span>
                                <span></span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </ListContainer>
            }
            <button className="btn bg-primary" onClick={onSubmit}>Sauvegarder</button>
        </div>
    )
}

export default ParameterProfile