import axios from 'axios'
import {API} from '../config'
import { toast } from 'react-toastify';


export const setWishlist=async (productID,token )=>{
   
    const headers = {
        "Content-Type":'application/json',
        "Authorization": `Bearer ${token}`
        } 
        const res = await axios.put(`${API}/product/wishlist/${productID}`,{},{headers})
      if(res.data.message=='Product add to Wishlist')
        toast.success(res.data.message)
    else toast.error(res.data.message)
    return res.data.status
}
export const getProductWishlist =async (productID,token )=>{
 
    const headers = {
        "Content-Type":'application/json',
        "Authorization": `Bearer ${token}`
        } 
        const res = await axios.post(`${API}/product/wishlist/${productID}`,{},{headers})
 
        if(res.data==false){
            return false
        }
       
        else return true
}
export const getUsertWishlist =async token =>{
 
    const headers = {
        "Content-Type":'application/json',
        "Authorization": `Bearer ${token}`
        } 
        const res = await axios.get(`${API}/product/wishlist/listwishlist`,{headers})
    return res.data
      
}

export const removeProductWish =async (wishID ,token) =>{
 
    const headers = {
        "Content-Type":'application/json',
        "Authorization": `Bearer ${token}`
        } 
        const res = await axios.post(`${API}/product/deletewishlist`,{wishID},{headers})

      
}