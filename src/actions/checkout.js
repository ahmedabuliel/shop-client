import axios from 'axios'
import {API} from '../config'

export const getCheckOut =async (token)=>{
    const headers = {
        "Content-Type":'application/json',
        "Authorization": `Bearer ${token}`
    } 
    const res = await axios.get(`${API}/getCheckOut`,{headers})
    return res.data
}
export const createOrder=async(payment,total,cart,token)=>{
    const headers = {
        "Content-Type":'application/json',
        "Authorization": `Bearer ${token}`
    } 
 const res=await axios.post(`${API}/user/createUserOrder`,{payment,total,cart},{headers})
    return res.data
}