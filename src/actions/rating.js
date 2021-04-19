import axios from 'axios'
import {API} from '../config'
import {toast} from 'react-toastify'
import StarRatings from 'react-star-ratings';

export const getRating =async(productID)=>{
    const res=await axios.get(`${API}/product/star/${productID}`)
    const stararray=res.data
    const length =stararray.length
    if(length>0){
    let totalratingarray=[]
  
    stararray.map(p=>{
        totalratingarray.push(p.stars)
    }) 
    let total= totalratingarray.reduce((p, n) => p + n, 0)
    let rating=total/length
    return {rating,length} 
}
else 
    return {rating:0,length}
}

export const setRating =async (productID,token,star)=>
{
    const headers = {
        "Content-Type":'application/json',
        "Authorization": `Bearer ${token}`
    } 
    const res = await axios.put(`${API}/product/star/${productID}`,{star},{headers})
 
}