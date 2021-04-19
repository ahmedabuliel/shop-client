import React, { useState,useEffect } from 'react'
import NavBarSide from '../../../Component/Navs/NavBarSide'
import {connect } from 'react-redux'
import CartTable from './CartTable'
import {finalPrice} from '../../../actions/products'
import {TAX} from '../../../config'
const Cart =({user,cartState,history})=>{
   
    const getTotal = () => {
        return cartState.reduce((currentValue, nextValue) => {
          return currentValue +( nextValue.amount * finalPrice(nextValue))*(1+TAX);
        }, 0);
      };
      const getTotalBefore = () => {
        return cartState.reduce((currentValue, nextValue) => {
          return currentValue +nextValue.amount * finalPrice(nextValue);
        }, 0);
      };
      const toCheckout = () => {
        history.push("/checkout");
      };
    return(
        <div className="container-fluid" >
        <div className='row'>
            <div className='col-md-2'>
                 <NavBarSide /> 
            </div>
            <div className='col-md-7 center'>
             <h2 className="topTitle mx-auto">Cart</h2>
                <CartTable/>
             </div>
             <div className='col-md-3 '>
             <h2 className="topTitle mx-auto">Order Summary</h2>
            
          <hr />
          <p>Products</p>
          {cartState.map((c, i) => (
            <div key={i}>
              <p>
                {c.product[0].Title} {c.selectedVari.map(element => {
                  return `, ${element.item.title} :`+ `${element.item.value} `;
                })
                }
                 <span> x </span> {c.amount} = {finalPrice(c) * c.amount}₪
              </p>
            </div>
                 ))}
                <hr />
                Before Tax  : {getTotalBefore()}₪<br/>
                Tax({`${TAX}`}) : {(getTotalBefore()*TAX).toFixed(2)}₪<br/>
                Total: <b>{getTotal().toFixed(2)}₪</b>
             <hr />
             {user.isAuthenticated &&<button
             onClick={toCheckout}
              className="btn btn-sm btn-primary mt-2"
              disabled={!cartState.length}
            >
              Proceed to Checkout
            </button>}
             </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
   
    user:state.user,
   cartState:state.cart
    
  })
  export default connect (mapStateToProps,null)(Cart);
