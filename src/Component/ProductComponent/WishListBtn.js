import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {setWishlist, getProductWishlist} from '../../actions/wishlist'
const WishListBtn =(props)=>{
 const [productwish,setProductWish]=useState(false) 
    
 const handleWishList = async()=>{
        
      var x = await setWishlist(props.productID,props.token)
      setProductWish(x)
       
    }
    
   
    const getProductWish=async()=>{
        let w =await getProductWishlist(props.productID,props.token)
        setProductWish(w)
   
    }
    useEffect(() => {
        getProductWish()
    }, [])
    return (<>
  {productwish?
  <button className='btn btn-danger'  onClick={e=>handleWishList()} ><i className="fas fa-heart"></i></button>
  : <button className='btn btn-danger' onClick={e=>handleWishList()} ><i className="far fa-heart"></i></button>}
 
  
        
    </>
    )
}

export default WishListBtn;