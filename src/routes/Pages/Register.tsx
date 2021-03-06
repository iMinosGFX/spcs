import React, { useState } from 'react';
//import logo_left from "../../assets/img/LogoOptaLP_WithoutText.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faEnvelope, faLock, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useToasts } from "react-toast-notifications"
import UsersAPI from "../../api/UsersAPI"
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Field from '../../components/Inputs/Field';
import InputMask from 'react-input-mask';
import StoragesAPI from '../../api/StoragesAPI';
import { StorageType } from '../../@types/storages';

type FormData = {
    firstName: string
    lastName:string
    email: string
    phone: string
    password: string
    passwordRepeat: string
    iban: string
    siret: string
    bic: string
    role: "SUPERMARKET" | "PRODUCER"
    storage_name:string
    postalCode:string
    street:string
    country: string
    city: string
}

const Login = () => {

    const { addToast } = useToasts()
    const history = useHistory()
    const { register, handleSubmit, control, errors, setValue } = useForm(); // initialize the hook
    const [error, setError] = useState<string>("")

    const onSubmit = (data: FormData) => {
        if(data.password !== data.passwordRepeat){
            setError("Les mots de passe sont différents")
            return;
        }
        UsersAPI.register({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            phone:data.phone.replace(/\s+/g, ''),
            bic:data.bic,
            iban:data.iban,
            siret:data.siret,
            role: data.role
        })
        .then(user => {
            StoragesAPI.create({
                userId: user.id,
                storageType: data.role === "SUPERMARKET" ? "SUPERMARKET_INVENTORY" : "WAREHOUSE",
                name: data.storage_name,
                street: data.street,
                city: data.city,
                postalCode: data.postalCode,
                country:data.country,
                latitude: null,
                longitude: null,
            })
            .then(() => {
                if(data.role === "SUPERMARKET"){
                    StoragesAPI.createPositions(user.id)
                    .then(() => history.push('/'))
                }
                history.push("/")
            })
            .catch(error => console.log("Error Storage :", error))
        })
        .catch(error => console.log("Error User:", error))
    }

    return (
        <>
            <div className="navigation">
                <div className="navigation-left">
                    {/* <img src={logo_left} alt="" style={{color: "#fff"}}/> */}
                    <div className="optaLabel">
                        <h2 className="light">Bienvenue sur S.P.C.S</h2>
                        <div className="divider"></div>
                        <h3 className="light">SUPINFO 2021</h3>
                    </div>
                </div>
                <div className="navigation-right" style={{overflowY:"auto"}}>
                    <div style={{paddingTop: 40, width: "85%", margin:"0 auto"}}>
                        <span style={{position: 'absolute', top: 40, left: 20, cursor: "pointer"}} onClick={() => history.push("/")}><FontAwesomeIcon icon={faArrowLeft} size="2x"/></span>
                        <h2 className="text-center">Vous inscrire</h2>
                        <form onSubmit={handleSubmit(onSubmit)} style={{padding: 40}}>
                            {!! error && 
                                <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center", width: "96%", background: 'rgba(238, 82, 83, .3)',padding: "0 20px", borderRadius: 3}}>
                                    <p style={{textAlign: 'center', fontWeight: 500, color: "#ee5253" }}>
                                        {error}
                                    </p>
                                    <FontAwesomeIcon icon={faTimes} color="#ee5253" size="lg" onClick={() => setError("")} className="pointer"/>
                                </div>
                            }
                            <div className="row">
                                <div className="md-6">
                                    <Field 
                                        name="firstName"
                                        label="Prénom *"
                                        register={register({required: true})}
                                        error={errors.firstName}/>
                                </div>
                                <div className="md-6">
                                    <Field 
                                        name="lastName"
                                        label="Nom *"
                                        register={register({required: true})}
                                        error={errors.lastName}/>
                                </div>
                            </div> 
                            <div className="row">
                                <div className="md-8">
                                        <Field 
                                            name="email"
                                            label="Adresse email *"
                                            register={register({
                                                pattern:{
                                                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: '' 
                                                },
                                                required: true 
                                            })}
                                            error={errors.email}/>
                                </div>
                                <div className="md-4">
                                    <label htmlFor='phoneNumber'>Numéro de téléphone *</label>
                                    <Controller
                                        as={InputMask}
                                        control={control}
                                        mask="99 99 99 99 99"
                                        type='text'
                                        alwaysShowMask
                                        rules={{ required: true }}
                                        name="phone" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="md-6">
                                    <Field 
                                        name="password"
                                        label="Mot de passe *"
                                        register={register({required: true})}
                                        type="password"
                                        error={errors.password}/>
                                </div>
                                <div className="md-6">
                                    <Field 
                                        name="passwordRepeat"
                                        label="Répeter votre mot de passe *"
                                        type="password"
                                        register={register({required: true})}
                                        error={errors.passwordRepeat}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="md-4">
                                    <Field 
                                        name="iban"
                                        label="IBAN *"
                                        register={register({
                                            pattern:{
                                                value: /^[0-9]*$/,
                                                message: '' 
                                            },
                                            required: true 
                                        })}
                                        error={errors.iban}/>
                                </div>
                                <div className="md-4">
                                    <Field 
                                        name="siret"
                                        label="SIRET *"
                                        register={register({
                                            pattern:{
                                                value: /^[0-9]*$/,
                                                message: '' 
                                            },
                                            required: true 
                                        })}
                                        error={errors.siret}/>
                                </div>
                                <div className="md-4">
                                    <Field 
                                        name="bic"
                                        label="BIC *"
                                        register={register({
                                            pattern:{
                                                value: /^[0-9]*$/,
                                                message: '' 
                                            },
                                            required: true 
                                        })}
                                        error={errors.bic}/>
                                </div>
                            </div>
                            <div className="row">
                                <span style={{paddingBottom: 10, display: 'block', color: errors.role ? "#ee5253" : "#0f141a"}}>Vous êtes...{errors.role && "(Choisir)"} *</span>
                                <div style={{display: 'flex'}}>
                                    <label className="radio-container">
                                        <input type="radio" id={`user_role_admin`} name="role" value="SUPERMARKET" ref={register({required: true})}/>
                                        <span>Un gérant de supermarché</span>
                                    </label>
                                    <label className="radio-container" >
                                        <input type="radio" id={`user_role_prducer`} name="role" value="PRODUCER" ref={register({required: true})}/>
                                        <span>un producteur</span>
                                    </label>
                                </div>
                            </div>
                            <h3 className="text-center" style={{paddingTop: 20}}>Entrepôt</h3>
                            <div className="row">
                                <div className="md-6">
                                    <Field 
                                        name="storage_name"
                                        label="Nom de l'entrepôt *"
                                        register={register({required:true})}
                                        error={errors.storage_name}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="md-8">
                                    <Field 
                                        name="street"
                                        label="Rue *"
                                        register={register({required:true})}
                                        error={errors.street}/>
                                </div>
                                <div className="md-4">
                                    <Field 
                                        name="postalCode"
                                        label="Code postal *"
                                        register={register({
                                            pattern:{
                                                value: /^(?:[0-8]\d|9[0-8])\d{3}$/,
                                                message: '' 
                                            },
                                            required: true 
                                        })}
                                        error={errors.postalCode}/>
                                </div>
                                <div className="md-6">
                                    <Field 
                                        name="city"
                                        label="Ville *"
                                        register={register({required:true})}
                                        error={errors.city}/>
                                </div>
                                <div className="md-6">
                                    <Field 
                                        name="country"
                                        label="Pays *"
                                        register={register({required:true})}
                                        error={errors.country}/>
                                </div>
                            </div>
                            <input type="submit" value="Valider mon inscription" className="btn bg-blue center"/>
                            <p className="right">* Champs obligatoires</p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Login