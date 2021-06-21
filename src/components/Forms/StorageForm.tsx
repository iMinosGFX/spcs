import React, {useState, useEffect} from 'react'
import { Controller, useForm } from 'react-hook-form';
import Field from '../Inputs/FieldWithoutRegister';
import StoragesAPI from "../../api/StoragesAPI"

type FormData = {
    city:string
    postalCode:string
    country:string
    street:string
    storage_name:string
} 

type Props = {
    handleSubmit(e: any): void,
    userId: number
    storageType: string
}

const StorageForm: React.FC<Props> = (props) => {
    
    const { register, handleSubmit, control, errors, setValue } = useForm(); // initialize the hook

    const onSubmit = (data: FormData) => {
        StoragesAPI.create({
            city: data.city,
            postalCode:data.postalCode,
            street:data.street,
            name: data.storage_name,
            country: data.country,
            userId: props.userId,
            storageType: props.storageType
        })
        .then(response => props.handleSubmit(response))
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} style={{padding: 40}}>
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
                <input type="submit" value="Valider mon inscription" className="btn bg-blue center"/>
                <p className="right">* Champs obligatoires</p>
            </div>
        </form>
    )
}

export default StorageForm