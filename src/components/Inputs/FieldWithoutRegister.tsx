import React from 'react';

type Props = {
    name:string
    label:string
    register?: any
    error?: any
    type?: string
    placeholder?: string
}

const Field = (props: Props) => {
    return(
        <div className="form-group inputText">
        <label htmlFor={props.name}>{props.label}</label>
        <input
            type={props.type ? props.type : "text"}
            placeholder={props.placeholder ? props.placeholder : "Saisir..."}
            name={props.name}
            id={props.name}
            ref={props.register}
            className={"form-input " + (props.error ? "form-error" : '')}
        />
        {props.error && <span className="input-error red" style={{marginBottom: 5}}>{props.error.type === "required" ? "Champs obligatoire" : props.error.message}</span>}
        </div>
    )
}

export default Field