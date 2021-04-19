import React ,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from "react-redux";
import CheckOutSummary from './CheckOutSummary'
import {getCheckOut,createOrder} from '../../../actions/checkout'
import {getAddressDb, saveAddressDb} from '../../../actions/user'
import NavBarSide from '../../../Component/Navs/NavBarSide'

import PaypalExpressBtn from 'react-paypal-express-checkout';
import {PAYPAL} from '../../../config'
import {toast} from 'react-toastify'
import { emptyCart } from '../../../actions/cart';
import { Alert } from 'antd';
const Checkout =({history})=>{
    const { user } = useSelector((state) => ({ ...state }));
    const { cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch()
    const [address,setAddress]=useState('');
    const [items,setItems]=useState([])
    const [total,setTotal]=useState(0)
    const [tax,setTax]=useState(0)
    const [saved,setSaved]=useState(false)

    useEffect(() => {
        loadCheckOut()
    }, [])
    
    const loadCheckOut = async()=>{
        const c = await getCheckOut(user.token)
        const a =await getAddressDb(user.token)
       
        setTotal(c.totalOrder)
        setTax(c.tax)
        setItems(c.orderItems)
        setAddress(a)
    }
    const changeAddress=(e)=>{
        setAddress(e.target.value)
    }
    const saveAddress=async(e)=>{
       e.preventDefault()
     const status=  await saveAddressDb(user.token,address)
     if(status=='ok') setSaved(true)
    }

    //paypal cardintial
    let env = 'sandbox'; // set here to 'production' for production
  let currency = 'ILS'; 
  const client = {
    sandbox: PAYPAL,
    production: 'YOUR-PRODUCTION-APP-ID' //add the client_id of production
  };
  const onSuccess=(payment)=>{
     
      if(payment.paid){
     
      createOrder(payment,total,cart, user.token).then((res) => {
        if(res=='OK') {
            history.push('/userdashboard')
            emptyCart(user.token)
            if (typeof window !== "undefined") {
                localStorage.removeItem("cart");
                dispatch({
                    type:'GET_CART',
                    payload:[]
                })
            }
        }

      })}
      else {
          toast.error('Payment Failed')
      }
  }
  const onCancel = (data) => {
    
    toast.warning('Payment cancel')
    
  };

  const onError = (err) => {
    console.log('Error!', err);
    toast.warning('Payment cancel',err)

  };
    return(
        <div className="container-fluid" >
        <div className='row'>
            
            <div className='col-md-2'>
                 <NavBarSide /> 
            </div>
            
            <div className='col-md-10 center '>
            <h2 className="topTitle mx-auto ">CheckOut</h2>
              <div className='col-md-10 card' >
              <form style={{"paddingTop":"5%"}} className=" col-md-12" onSubmit={e=>saveAddress(e)} > 
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Address</span>
                </div>
                <input type="text"  value={address} onChange={e=>changeAddress(e)} className="form-control col-12" 
                placeholder="User Address" name='title'  min={5}  required/>
                </div>
                <button type="submit" className='btn btn-primary'>Save Address</button>
                </form>
              <div>
                  <CheckOutSummary items={items} total={total} tax={tax}/>
                 
             {user.isAuthenticated && saved ? 
              <PaypalExpressBtn
            env={env}
            client={client}
            currency={currency}
            total={total}
            onError={onError}
           onSuccess={onSuccess}
            onCancel={onCancel}  />: 
             <Alert message="You Have To Save Address" type="error" />}
              </div>
              </div>
              
             </div>
             </div>
        </div>
    )
}

export default Checkout