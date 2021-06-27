import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { UserState } from '../../store/user/reducer';
import { rolesConfig } from '../../config/roles';
import { uniqBy } from 'lodash';
import { setSecondaryNav, setNewBreadCrumb, setContentTitle } from '../../store/navigation/action';
import SecondaryNav from "../../components/DashboardNavigation/SecondaryNav"
import ParameterProfile from './../../components/Parameters/ParameterProfile';
import _ from 'lodash';
import { isMobile } from 'react-device-detect';
import { rewriteMainContentBackground } from '../../helpers/utils';

const Settings = () => {

    const {connectedUser} = useSelector<UserState, UserState>((state: UserState) => state)
    const [settingsList, setSettingsList] = useState<any>([])
    const dispatch = useDispatch()
    const [selectedSetting, setSelectedSetting] = useState<any>()

    useEffect(() => {
        dispatch(setNewBreadCrumb([{name:"Paramètres", link:"/app/settings", statut:"active"}]))
        dispatch(setContentTitle('Paramètres'))
        dispatch(setSecondaryNav(isMobile ? 'collapse' : 'display'))
        rewriteMainContentBackground("#fff")
        if(!!connectedUser){
            let roles = [...connectedUser.authorities, "USER"];
            
            let allowedRoutes = roles.reduce((acc, role) => {
                return [...acc, ...rolesConfig[role].routes];
            }, []);
            
            let allSettingsList = allowedRoutes.filter(route => route.module === 4 )
            allSettingsList = uniqBy(allSettingsList, 'component')
            let _settingsList = []
            let subSetting = ""
            allSettingsList.map(setting => {
                if(setting.subSettings !== subSetting){
                    subSetting = setting.subSettings
                    let _object = {
                        title: setting.subSettings,
                        subs: allSettingsList.filter(set => set.subSettings === setting.subSettings)
                    }
                    _settingsList.push(_object)
                }
            })
            setSettingsList(_settingsList)
            setSelectedSetting(allSettingsList[0])
        }
    }, [connectedUser])

    const renderSwitch = (name) => {
        switch (name){
            case 'ParameterProfile':
                return <ParameterProfile/>
            default: 
                return null
        }
    }

    return(
        <>
            <SecondaryNav color='light' extendTitle='Paramètres'>
                <ul>
                    {settingsList.map((item,i) => {
                        return(
                            <div key={i}>
                                {!isMobile && <li className="divider"></li>}
                                <li className="title">{item.title}</li>
                                    {item.subs.map((sub,i) => (
                                    <li className="link" onClick={() => setSelectedSetting(sub)} key={i}>{sub.title}</li>
                                ))}
                            </div>
                        )
                    })}
                </ul>
            </SecondaryNav>
            <div className="row">
                {!!selectedSetting &&
                    renderSwitch(selectedSetting.component)
                }
            </div>
        </>
    )
}

export default Settings