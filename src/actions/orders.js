import axios from 'axios'
import {API} from '../config'

export const getUserOrders =async (token)=>{
    const headers = {
        "Content-Type":'application/json',
        "Authorization": `Bearer ${token}`
    } 
    const res = await axios.get(`${API}/user/getUserOrder`,{headers})
 res.data.forEach(element => {
     element.Items=JSON.parse( element.Items.slice(1,element.Items.length-1))
 });  
return res.data
}
export const getAdminOrders =async (token)=>{
    const headers = {
        "Content-Type":'application/json',
        "Authorization": `Bearer ${token}`
    } 
    const res = await axios.get(`${API}/admin/getAdminOrder`,{headers})
 res.data.forEach(element => {
     element.Items=JSON.parse( element.Items.slice(1,element.Items.length-1))

 }); 
 
return res.data
}
export const changeStatus =async(orderID, status, token)=>{
    const headers = {
        "Content-Type":'application/json',
        "Authorization": `Bearer ${token}`
    } 
    const res = await axios.post(`${API}/admin/updateOrderStatus`,{orderID, status},{headers})

}