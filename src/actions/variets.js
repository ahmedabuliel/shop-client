import axios from 'axios'
import {API} from '../config'
import { toast } from 'react-toastify';

import { GET_VARIETS } from './types';
import store from '../store'
export const getVariets =()=> async dispatch => {
    try{
        const config={
            "Content-Type":"application/json"
        }
        const res= await axios.get(`${API}/listVariets`,config)
       
        dispatch({
            type:GET_VARIETS,
            payload:filterVariets(res.data)
        })
      
       

    } 
    catch(err){
        toast.error(err.response.data.error)
    }
}
export const filterVariets=((arr)=>{
  
  const all={}
    var temparr=[]
    var tempobj=arr[0]
    arr.forEach(variet => {
      
      all[variet.varietsName]={title:variet.varietsName , res:[]}
      if(tempobj.varietsName != variet.varietsName){
        temparr=[]
        tempobj=variet
      }
     
      temparr.push({ID:variet.variID,varietsID:variet.varietsID,title:variet.varietsName,value:variet.value,chk:variet.color,price:variet.Price,filename:variet.Filename});
     
      all[variet.varietsName]={title:variet.varietsName , res:temparr}
     
    });
  
    return Object.values(all);
}) 
export const getVariet =(variId)=>{
    let {variets}= store.getState();
    let variet;
   variets.map((vari)=>{
       vari.res.map((v)=>{
        if(v.ID==variId)
        return variet = {title:vari.title,value:v.value,chk:v.chk};
    })
})
   
   
return variet
}
export const createVariet = async (name,value,chk,token) =>  {
    try{
      const  data={name,value,chk}
    
      const headers = {
        "Content-Type":'application/json',
        "Authorization": `Bearer ${token}`
        } 
    const res= await axios.post(`${API}/createVariet`,data,{headers})
        toast.success(`${name} create sucsses `)
        getVariets()
    } 
    catch(err){
     
      toast.error(err.response.data.error)
     
    } 
}
export const updateVariets=async (name,value ,variId,token)=>{
    try{
       
        const  data={variId,name,value}
        const headers = {
          "Content-Type":'application/json',
          "Authorization": `Bearer ${token}`
          } 
          const res= await axios.put(`${API}/updateVariet`,data,{headers})
          toast.success(`${name} : ${value} updated `)
            getVariets()
    }
    catch(err){
       
       toast.error(err.response.data.error)
      
     } 
}
export const updateVarietTitle=async (newTitle,title,token)=>{
    try{
       
        const  data={newTitle,title}
        const headers = {
          "Content-Type":'application/json',
          "Authorization": `Bearer ${token}`
          } 
          const res= await axios.put(`${API}//updateVarietTitle`,data,{headers})
          toast.success(`${newTitle}: updated `)
            getVariets()
    }
    catch(err){
       
       toast.error(err.response.data.error)
      
     } 
}
export const removeVariet =async (name,value,variId,token )=>{
    try{
        
        const  data={variId}
        const headers = {
          "Content-Type":'application/json',
          "Authorization": `Bearer ${token}`
          } 
          const res= await axios.post(`${API}/removeVariet`,data,{headers})
          toast.success(`${name}:${value} deleted `)
    }
    catch(err){
       
       toast.error(err.response.data.error)
      
     } 
}

export const removeVarietTitle =async (name,token )=>{
    try{
        
        const  data={name}
        const headers = {
          "Content-Type":'application/json',
          "Authorization": `Bearer ${token}`
          } 
          const res= await axios.post(`${API}//removeVarietTitle`,data,{headers})
          toast.success(`${name} deleted `)
    }
    catch(err){
       
       toast.error(err.response.data.error)
      
     } 
}

