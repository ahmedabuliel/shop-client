import React ,{useState,useEffect} from 'react';
import NavBarSide from '../../../Component/Navs/NavBarSide'
import {useHistory} from 'react-router-dom'
import{connect } from 'react-redux' 
import {  getUserOrders} from "../../../actions/orders";
import { Badge} from 'antd';
import OrderTable from './OrderTable'
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderPdf from './OrderPdf'
import { TAX } from '../../../config';
const UserOrders =({isAuthenticated,user})=>{
   
   const [orders,setOrders]=useState([])
    let history = useHistory();
    if(isAuthenticated!=true ) { history.push("/") }
   useEffect(() => {
      loadOrders()
   }, [])
   const loadOrders=async()=>{
       const o =await getUserOrders(user.token)
       setOrders(o)
   }
   
   return (<>
    
   
    <div className="container-fluid" >
        <div className='row'>
         <div className='col-md-2'>
         <NavBarSide/> 
         </div>
      
        <div className='col-md-10 center '>
            <h2 className="topTitle mx-auto ">User Orders</h2>
           
            {
                orders && orders.map((order,i)=>{
                    return <>
                        <div key={order.OrderID} className="m-5 p-3 card">
                            <p>
                                <span>
                                    Order key: {order.OrderID}
                                </span>
                                <span>Total with tax ({`${TAX}`}): {order.Total} &#8362;</span>
                                <span>Date : {order.Date.replace('T'," ").replace(".000Z","")}</span>
                            </p>
                            <p>
                            <Badge count={`Status: ${order.Status}`}     style={{ backgroundColor: 'rgb(84 147 53)' }}/>
                            </p>
                            <div className="card-body">
                            <OrderTable order={order}/>
                            <div className="row">
                                <div className="col">
                                <PDFDownloadLink
                                    document={<OrderPdf order={order} />} 
                                    fileName={`invoice${order.OrderID}.pdf`}
                                    className="btn btn-sm btn-block btn-outline-primary"
                                    >
                                    Download PDF
                                </PDFDownloadLink>
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
export default connect(mapStateToProps, null)(UserOrders)

