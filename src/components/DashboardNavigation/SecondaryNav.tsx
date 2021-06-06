import React, {useState, useEffect} from 'react'
import {useSelector} from "react-redux"
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setSecondaryNav } from '../../store/navigation/action';
import { isMobile } from 'react-device-detect';
import { NavigationState } from '../../store/navigation/reducer';

type Props = {
    color: 'light' | 'dark'
    extendTitle:string
    children: any
}


const Container = styled("div")<{collapse: boolean, darkmode: boolean, isPrimaryNavExtend: boolean}>`
    position: fixed;
    left: ${props => props.isPrimaryNavExtend ? '250px'  : '80px'};
    width: ${props => props.collapse ? '30px' : '250px'};
    top: 0;
    height: 100vh;
    background: ${props => props.darkmode ? "#2a3c4e" : props.color === "light" ? "#fff" : "#101114"};
    border-right: 1px solid rgba(22,125,255,0.30);
    transition: 0.4s;
    z-index: 2;
    .compress-icon{
        position: relative;
        float: right;
        margin-top: 1rem;
        margin-right: ${props => props.collapse ? "0.6rem" : "1rem"};
        font-size: 1.1rem;
        color: ${props => props.color === "light" ? "#8ba6b8" : "#fff"};
        cursor: pointer;
    }
    .extend-title{
        display: ${props => props.collapse ? "block" : "none"};
        transform-origin: 0 0;
        transform: rotate(90deg);
        position: absolute;
        top: 3rem;
        left: 1.6rem;
        color: ${props => props.color === "light" ? "#8ba6b8" : "#fff"};
    }
    ul{
        list-style: none;
        margin: 0;
        padding: 0;
        padding-top: 10px;
        display: ${props => props.collapse ? 'none' : 'block'};
        white-space: nowrap;
        li{
            padding: 0px 10px;
            &.title{
                color: ${props => props.color === "light" ? "#216A9A" : "#fff"};
                text-transform: uppercase;
                font-size: 1.2rem;
                font-weight: 500;
                margin-top: 10px;
                margin-bottom: 5px;
                width: max-content;
            }
            &.link{
                transition: .2s background ease;
                height: 2rem;
                line-height: 2rem;
                color: ${props => props.darkmode ? "#bccde0" : props.color === "light" ? "#435F71" : "#b4b4b4"};
                cursor: pointer;
                &:hover{
                    background: ${props => props.color === "light" ? "rgba(0,0,0,.05)" : "rgba(255,255,255,0.05)"};
                }
                &.active{
                    background: #216A9A;
                    color: #fff;
                }
            }
            &.divider{
                height: 1px;
                width: auto;
                background:  ${props => props.color === "light" ? "rgba(0,0,0,.1)" : "#858585"};
                margin: 10px 0;
            }
        }
    }
    @media only screen and (max-width: 540px){
        position: absolute;
        width: 100%;
        height: 30px;
        top: 145px;
        left: 0;
        .extend-title{
            transform: rotate(0deg);
            top: 6px;
            display: block !important;
        }
        ul{
            background:#fff;
            border-bottom: 1px solid rgba(22, 125, 255, 0.15);
            height: max-content;
        }
    }
`

const SecondaryNav = (props: Props) => {

    const [isCollapse, setIsCollapse] = useState<boolean>(isMobile ? true : false)
    const dispatch = useDispatch()
    const {navigation: {darkMode, isPrimaryNavExtend}} = useSelector<NavigationState, NavigationState>((state: NavigationState) => state)

    useEffect(() => {
        isCollapse ? dispatch(setSecondaryNav('collapse')) : dispatch(setSecondaryNav('display'))
    }, [isCollapse])

    return(
            <Container color={props.color} collapse={isCollapse} darkmode={darkMode} isPrimaryNavExtend={isPrimaryNavExtend}>
                <FontAwesomeIcon icon={isCollapse ? faExpandAlt : faCompressAlt} className="compress-icon" title={isCollapse ? 'Étendre' : 'Rétrécir'} onClick={() => setIsCollapse(!isCollapse)}/>
                <span className="extend-title">{props.extendTitle}</span>
                <div style={{clear: 'both'}}></div>
                {props.children}
            </Container>
    )
}

export default SecondaryNav