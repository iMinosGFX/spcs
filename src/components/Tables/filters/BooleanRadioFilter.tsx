import React, {useState, useEffect, useContext} from 'react'
import { FilterItem } from '../FiltersInteract';
import styled  from 'styled-components';
import _ from "lodash"
import {FiltersContext} from "../ServerSideTable"

type Props = {
    filter: FilterItem
}

const FilterContainer = styled.div`
width: 100%;
box-sizing: border-box;
padding: 8px 5px;
margin: 10px 0;
.title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #888;
    cursor: pointer;
    label {
        font-size: 14px;
    }
    .chevron{
        padding-right: 5px;
    }
}
.checksContainer{
    max-height: 300px;
    overflow: auto;
    .check-group{
        label{
            &:after{
                top: 2px;
            }
        }
    }
}
`

const BooleanRadioFilter = (props: Props) => {

    const filtersState = useContext(FiltersContext)

    const handleChange = (index: string, status:string) => {
        let _preventArray = filtersState.filtersState[props.filter.name]["main"]
        _preventArray["value"][index].status = status
        filtersState.changeMainFilter(props.filter.name, _preventArray)
    }

    return(
        <FilterContainer>
              <div className="checksContainer">
                {filtersState.filtersState[props.filter.name]["main"]["value"].flatMap((radio,i) => {
                    return(
                        <div key={i}>
                            <label>{radio.label}</label>
                            <div style={{display: 'flex', paddingTop: 5}}>
                                <label className="radio-container">
                                    <input type="radio" id={`radio_type_${radio.name}_YES`} name={`radio_type_${radio.name}_YES`} value="YES" checked={radio.status === "YES"} onChange={() => handleChange(i, "YES")}/>
                                    <span>Oui</span>
                                </label>
                                <label className="radio-container">
                                    <input type="radio" id={`radio_type_${radio.name}_NO`} name={`radio_type_${radio.name}_NO`} value="NO" checked={radio.status === "NO"} onChange={() => handleChange(i, "NO")}/>
                                    <span>Non</span>
                                </label>
                                <label className="radio-container">
                                    <input type="radio" id={`radio_type_${radio.name}_NA`} name={`radio_type_${radio.name}_NA`} value="NA" checked={radio.status === "NA"} onChange={() => handleChange(i, "NA")}/>
                                    <span>N/A</span>
                                </label>
                            </div>
                        </div>
                    )
                })}
            </div>
        </FilterContainer>
    )
}

export default BooleanRadioFilter