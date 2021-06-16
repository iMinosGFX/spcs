import React, { useState } from 'react';
//import logo_left from "../../assets/img/LogoOptaLP_WithoutText.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import {useDispatch} from 'react-redux'
import { setConnectedUser } from '../../store/user/actions';
import { useToasts } from "react-toast-notifications"
import AuthAPI from "../../api/AuthAPI"
import { ConnectedCredentials } from '../../@types/entities';
import { useForm } from 'react-hook-form';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

const Login = () => {

    const dispatch = useDispatch()
    const { addToast } = useToasts()
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory()
    
    const onSubmit = async (data: ConnectedCredentials) => {
        AuthAPI.authenticated(data)
        .then(token => {
            dispatch(setConnectedUser(jwtDecode(token)))
            history.push('/app/home')       
            addToast('Vous êtes connecté', {appearance: "success"})
        })
        .catch(error => {
            if(error.message === "Invalid token specified") {
                addToast('Identifiants incorrects', {appearance: "error"})
            } else {
                addToast('Erreur authentification', {appearance: "error"})
            }
        })
    }

    return (
        <>
            <div className="navigation">
                <div className="form-login">
                    <h1 className="gray-dark">Connexion</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="inputContainer">
                            <FontAwesomeIcon className="icon" icon={faEnvelope}/>
                            <input type="text" 
                                className="ipt_login ipt_mail"
                                name="username" 
                                placeholder="Adresse email"
                                ref={register}/>
                        </div>
                        <div className="inputContainer">
                            <FontAwesomeIcon className="icon" icon={faLock}/>
                            <input type="password" 
                                className="ipt_login ipt_pass" 
                                name="password" 
                                placeholder="Mot de passe"
                                ref={register}/>
                        </div>
                        <button type="submit" className="btn btn-lg bg-primary light center">Se connecter</button>
                        <p className="text-center">Pas encore inscrit ? <span className="font-underline pointer" onClick={() => history.push("/register")}> Cliquez ici</span></p>
                    </form>
                </div>
                <div className="navigation-left">
                    {/* <img src={logo_left} alt="" style={{color: "#fff"}}/> */}
                    <div className="optaLabel">
                        <h2 className="light">Bienvenue sur S.P.C.S</h2>
                        <div className="divider"></div>
                        <h3 className="light">SUPINFO 2021</h3>
                    </div>
                </div>
                <div className="navigation-right">
        
                </div>
            </div>
        </>
    );

}

export default Login