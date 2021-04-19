import axios from 'axios'
import {API} from '../config'
import {SET_FILTER} from '../actions/types'
import {filterVariets} from './variets'
import { toast } from 'react-toastify';

export const createProduct=async(product,token)=>{
 try{ const res = await axios.post(`${API}/setProduct`, product, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
      });
      toast.success(res.data.msg)
    }
    catch(err)
    {
        toast.error(err.data.err)
    }
}
export const removeProduct=async(ID,token)=>{
    try{ 
        const res = await axios.post(`${API}/removeProduct`, {ID}, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
      });
      toast.success(res.data.msg)
    }
    catch(err)
    {
        toast.error(err.data.err)
    }
}
export const updateProduct=async(values,ID,token)=>{
    try{ 
        const res = await axios.put(`${API}/updateProduct`, {values,ID}, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
      });
      toast.success(res.data.msg)
    }
    catch(err)
    {
        toast.error(err.data.err)
    }
}

export const getProducts = async (catID)  => {
    try{
        const config={
            "Content-Type":"application/json"
        }
       
        let res;
        if(catID!=null){
           
            res= await axios.get(`${API}/getProducts/${parseInt( catID)}`,config)
         
        }
         else
        res= await axios.get(`${API}/getProducts`,config) 
    
     return res.data

    } catch(err){
      
    }
}
export const getProduct = async (ID)  => {
    try{
        const config={
            "Content-Type":"application/json"
        }
       
        const res= await axios.get(`${API}/getProduct/${ID}`,config)
             return res.data

    } catch(err){
      
    }
}
export const getTopProducts = async ()  => {
    try{
        const config={
            "Content-Type":"application/json"
        }
       
        const res= await axios.get(`${API}/getTopProducts/`,config)
             return res.data

    } catch(err){
      
    }
}

export const getProductImages = async (ID)  => {
    try{
        const config={
            "Content-Type":"application/json"
        }
       
        const res= await axios.get(`${API}/getProductImages/${ID}`,config)
             return res.data

    } catch(err){
      
    }
}


export const  getVariets=async  productID=> {
    let res;
    try{
 
       const data={
      productID
        }
        res =await axios.post(`${API}/getVariets`,data)
       
    }
    catch(err){
        res=err.response
    }
    
return filterVariets(res.data)
    
       
}
export const getSearchProducts = async (search)  => {
    try{
       
        const data={
          search
              }
            
        const res= await axios.post(`${API}/getSearchProducts/`,data)
     
        return res.data

    } catch(err){
      
    }
}
export const finalPrice=item=>{
    let price=item.product[0].Price;
    item.selectedVari && item.selectedVari.forEach((i,index)=>{
        if(i.item.price)
        price =i.item.price
    })
    return price
 }
export const setProductsFilter= filter=> dispatch=>{
    
  
        dispatch({
        type:SET_FILTER,
        payload:filter
    })
}
