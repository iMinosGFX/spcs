import axios from "axios"
import qs from 'qs'
import { token } from '../@types/common';
import { ConnectedCredentials } from '../@types/entities';
import { API_LOGIN } from "../config/api";

const config = {
    headers: {
      'Content-Type': 'application/json'
    }
}

function getCookieValue(a: string) {
    let b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

function clearToken() {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
    document.cookie = `refreshToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
    return Promise.resolve();
}

function getToken() {
    let token = getCookieValue('token');
    setAxiosToken(token)
    return token
}

function setToken(token: token, refreshToken: token) {
    document.cookie = `token=${token}; path=/;`
    //document.cookie = `refreshToken=${refreshToken}; path=/;`
}

axios.interceptors.request.use(req => {
    if(getToken() && (!req.url.includes('oauth/token') || !req.url.includes('oauth/check_token'))){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ getToken();
        return req
    }
    return req
})


function authenticated(credentials: ConnectedCredentials){
    return axios
        .post(API_LOGIN,credentials,config)
        .then(result => {
            console.log(result.data.access_token)
            setToken(result.data.access_token, result.data.refresh_token);
            setAxiosToken(result.data.access_token);
            return result.data.access_token;
        })
        .catch(error => {
        return error;
     })
}


function setAxiosToken(token: token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
}

function checkToken(){
    return !getToken() ? Promise.reject()
     : axios
        .post("API CHECK TOKEN",'',{
          params: {
            token: getToken()
          },
          headers:{'Authorization':'Basic ZnJvbnQtZW5kOm5vLXNlY3JldA=='}})
        .then(result => result.data)
}

function refreshToken(){
    return axios
        .post("LOGIN_API", qs.stringify({
            grant_type:"refresh_token",
            client_id:"front-end",
            client_secret: "no-secret",
            refresh_token: getCookieValue('refreshToken')
        }), {
            headers: { 
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            }
        })
        .then(response => {setAxiosToken(response.data.access_token); return response.data })
}

export default{
    getToken,
    authenticated,
    checkToken,
    refreshToken,
    clearToken,
    setToken
}