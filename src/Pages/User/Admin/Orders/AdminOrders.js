import React ,{useState,useEffect} from 'react';
import NavBarSideAdmin from '../../../../Component/Navs/NavBarSideAdmin'
import {useHistory} from 'react-router-dom'
import{connect } from 'react-redux' 
import { getAdminOrders} from "../../../../actions/orders";
import {changeStatus} from '../../../../actions/orders'
import OrderTable from './OrderTable'
import { TAX } from '../../../../config';
import { Select } from 'antd';
import {toast} from 'react-toastify'
const { Option } = Select;
const AdminOrders =({isAuthenticated,user})=>{
   
   const [orders,setOrders]=useState([])
  const [keyword,setKeyword]=useState('')
    let history = useHistory();
    if(isAuthenticated!=true ) { history.push("/") }
   useEffect(() => {
      loadOrders()
   }, [])
   const loadOrders=async()=>{
       const o =await  getAdminOrders(user.token)
       setOrders(o)
       
   }
  const handleStatusChange=(orderId,status)=>{
    changeStatus(orderId, status, user.token).then((res) => {
        toast.success("Status updated");
        loadOrders();
      });
    };
    const handleSearchChange = e => {
        e.preventDefault()
        setKeyword(e.target.value.toLowerCase())
       
      }
   
   return (<>
    
   
    <div className="container-fluid" >
        <div className='row'>
         <div className='col-md-2'>
         <NavBarSideAdmin/> 
         </div>
      
        <div className='col-md-10 center '>
            <h2 className="topTitle mx-auto ">Admin Orders</h2>
            <input type="search" placeholder="Search by order key" value={keyword} 
            onChange={handleSearchChange} className="form-control mb-4" />
           
            {
                orders && orders.filter(o => o.OrderID.toLowerCase().includes(keyword)).map((order,i)=>{
                    return <>
                        <div key={order.OrderID} className="m-5 p-3 card">
                            <p>
                                <span>
                                    Order key: {order.OrderID}
                                </span>
                                <span>Total with tax ({`${TAX}`}): {order.Total} &#8362;</span>
                                <span>Date : {order.Date.replace('T'," ").replace(".000Z","")}</span><br/>
                                <span>
                                   Name: {JSON.parse(order.PayPalPayment).address.recipient_name}
                                </span>
                                <span>
                                  Email: {JSON.parse(order.PayPalPayment).email}
                                </span>
                                <span>
                                 Delivery Address: {order.Address}
                                </span>
                            </p>
                           <div className="row m-auto">
                            <label>Change Status :</label>
                            <select name="status"  defaultValue={order.Status}
                             onChange={e=>handleStatusChange(order.OrderID,e.target.value)}>
                                <option value="Not Processed">Not Processed</option>
                                <option value="Processing">Processing</option>
                                <option value="Dispatched">Dispatched</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Completed">Completed</option>
                            </select>
                           </div>
                            <div className="card-body">
                            <OrderTable order={order}/>
                            <div className="row">
                                <div className="col">
                                
                                </div>    
                             </div>
                            </div>
                        </div>
                    </>
                })
            }
            
        </div>
        </div>
    </div>
   
    </>)
}
const mapStateToProps = (state) => ({
    user: state.user,
    isAuthenticated:state.user.isAuthenticated
})
export default connect(mapStateToProps, null)(AdminOrders)

