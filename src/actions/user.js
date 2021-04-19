import axios from 'axios'
import {API} from '../config'
import { REGISTER_SUCCESS,REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR,LOGOUT_SUCCESS,LOGOUT_FAIL } from './types';
import {toast} from 'react-toastify'



export const loadUser = token => async dispatch => {
    try {
      
       const headers = {
           "Content-Type":'application/json',
           "Authorization": `Bearer ${token}`
       } 
     
       const res = await axios.get(`${API}/auth`, {headers})
       
       dispatch({
           type: USER_LOADED,
           payload: res.data
       })
       
    } catch (err) {
      
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const signout = () => async dispatch => {
    try {
        const config={
            "Content-Type":"application/json",
            
        }
        const res= await axios.get(`${API}/signout`,config)

        dispatch({
            type:LOGOUT_SUCCESS,
            payload:res.data
        })
        localStorage.removeItem('cart')

    } catch (err) {
        toast.error(err.response.data.error)
        dispatch({
            type:LOGOUT_FAIL
        })
    }
}

export const signup = (formData) => async dispatch => {
    try{
        const config = {     
            headers: { 'content-type': 'multipart/form-data',
             }
        }
        
        
        const res= await axios.post(`${API}/signup`,formData,config)
       
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })

    } catch(err){
      
        toast.error(err.response.data.error)
        dispatch({
            type:REGISTER_FAIL
        })
    }
}

export const signin = user => async dispatch => {
    try{
        const config={
            "Content-Type":"application/json"
        }
        const res= await axios.post(`${API}/signin`,user,config)

        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })

    } catch(err){
        
        toast.error(err.response.data.error)
        dispatch({
            type:LOGIN_FAIL
        })
    }
}
export const forget=async(email)=>{
    const config={
        "Content-Type":"application/json"
    }
    const res= await axios.post(`${API}/forgetpassword`,{email},config)
  if(res.data=='Email sent') toast.success(res.data)
  else toast.error(res.data)
}
export const updatePassword=(password,token) =>async dispatch=> {
    const headers={
        "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`
    }
 
    const res= await axios.post(`${API}/updatePassword`,{password},{headers})
    dispatch({
        type:LOGIN_SUCCESS,
        payload:res.data
    })
 console.log(res.data)
}

export const updateProfile = async (formData,token) =>  {
    try{
        const res= await axios.put(`${API}/updateProfile`,formData, {headers: { 'content-type': 'multipart/form-data',
        "Authorization": `Bearer ${token}`}
         })
      
        toast(res.data)

    } catch(err){ 
    }
}

export const userCart = async (cart, token) =>
  await axios.post(
    `${API}/updateCart`,
    { cart },
    {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    }
  );
  export const getUserCart = async (token) =>{
  
    let finalCart=[]
    const res = await axios.get(`${API}/getCart`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      }
    );
    if(res.data){
    const cart=res.data.Items.slice(1,res.data.Items.length-1)
     finalCart=JSON.parse(cart)
      }

  return finalCart
  
    
}
export const saveAddressDb = async (token,address)=>{
    const headers = {
        "Content-Type":'application/json',
        "Authorization": `Bearer ${token}`
    } 
    const res = await axios.post(`${API}/updateAddress`, {address},{headers});
   toast.success(res.data.msg)
   return res.data.status
}
export const getAddressDb = async (token,address)=>{
    const headers = {
        "Content-Type":'application/json',
        "Authorization": `Bearer ${token}`
    } 
    const res = await axios.get(`${API}/getAddress`,{headers});
   return res.data.Address
}