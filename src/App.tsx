import * as React from "react";
import {useState, useEffect} from "react"
import { Route, Switch, Redirect } from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import "./assets/scss/global.scss"
import {useDispatch, useSelector} from 'react-redux'
import { UserState } from './store/user/reducer';
import { setConnectedUser } from './store/user/actions';
import { setDarkMode, setIsPrimaryNavExtend } from './store/navigation/action';
import AuthAPI from "./api/AuthAPI";
import { getIsPrimaryNavExtend, getlocalStorageDarkMode } from './helpers/localStorageManagement';
import jwtDecode from "jwt-decode";

export const App = () => {

  const dispatch = useDispatch()
  const [isRedirect, setIsRedirect] = useState<boolean>(true);
  const {connectedUser} = useSelector<UserState, UserState>((state: UserState) => state)

  useEffect(() => {
    if(AuthAPI.getToken()){
      dispatch(setConnectedUser(jwtDecode(AuthAPI.getToken())))
      dispatch(setDarkMode(getlocalStorageDarkMode()))
      dispatch(setIsPrimaryNavExtend(getIsPrimaryNavExtend()))
    } else {
      setIsRedirect(true)
    }
  }, [])

  return (
      <>
        {
          !!connectedUser && connectedUser.sub ?
          <Switch>
            <Route path="/app" component={PrivateRoutes} />
            <Redirect to ="/app/home" />
          </Switch>
          :!isRedirect ? <div>En cours d'authentification...</div>
          : <PublicRoutes/>
        }
      </>
	);
};