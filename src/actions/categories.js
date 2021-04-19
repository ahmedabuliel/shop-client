import axios from 'axios'
import { toast } from 'react-toastify';
import {API} from '../config'

import store from '../store'

export const getCategories =async () =>  {
    try{
        const config={
            "Content-Type":"application/json"
        }
        const res= await axios.get(`${API}/getCategories`,config)
      
        return res.data

    } catch(err){
        toast.error(err.response.data.error)
    }
}
export const getCategory =async (catId)=>{

        const config={
            "Content-Type":"application/json"
        }
        const res= await axios.get(`${API}/getCategory/${catId}`,config)
        console.log(res.data)
        return res.data[0]

    
}
export const setCategory = async (name,token) =>  {
    try{
      const  data={name}
      const headers = {
        "Content-Type":'application/json',
        "Authorization": `Bearer ${token}`
        } 
    const res= await axios.post(`${API}/setCategory`,data,{headers})
      
   
        toast.success(`${name} create sucsses `)
    } 
    catch(err){
     
      toast.error(err.response.data.error)
     
    } 
}
export const removeCategory =async (name,catId,token )=>{
    try{
        
        const  data={catId}
        const headers = {
          "Content-Type":'application/json',
          "Authorization": `Bearer ${token}`
          } 
          const res= await axios.post(`${API}/removeCategory`,data,{headers})
          toast.success(`${name} deleted `)
    }
    catch(err){
       
       toast.error(err.response.data.error)
      
     } 
}
export const updateCategory=async (name ,catId,token)=>{
    try{
        
        const  data={catId,name}
        const headers = {
          "Content-Type":'application/json',
          "Authorization": `Bearer ${token}`
          } 
          const res= await axios.put(`${API}//updateCategory`,data,{headers})
          toast.success(`${name} updated `)
          getCategories();
    }
    catch(err){
       
       toast.error(err.response.data.error)
      
     } 
}
