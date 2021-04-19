import React, { useState ,useEffect} from 'react'
import NavBarSide from '../../../Component/Navs/NavBarSide'
import {connect } from 'react-redux'
import {Link} from 'react-router-dom';
import {getUsertWishlist,removeProductWish} from '../../../actions/wishlist'
import { UPLOAD } from '../../../config';
const WishList =({user})=>{
    const [wishList,setWishList]= useState([])
    const handleWishList=async ()=>{
      const w=await getUsertWishlist(user.token)
      setWishList(w);

    }
    const handleRemove=async (ID)=>{
        await removeProductWish(ID,user.token)

    }
    useEffect(() => {
      handleWishList()
    
    }, [])
 
    return (
    <div className="container-fluid" >
        <div className='row'>
            <div className='col-md-2'>
                 <NavBarSide /> 
            </div>
            <div className='col-md-10 center'>
             <h2 className="topTitle mx-auto">WishList</h2>
             <div className='row'>
              {wishList && wishList.map((item,index) => {
                  return ( 
                  <div  key ={index} className='col-md-3'>
                     
                       <div className="card  " >
                       {item && <img src={`${UPLOAD}${item.Filename}`} className="card-img-top img-cart " alt="..."/>}
                       <div className="card-body">
                       <Link exact to={{pathname:`/product/${item.ID}`}}>
                       <h5 className="card-title">{item.Title}</h5>
                        </Link>
                        <button className='btn btn-outline-danger btn-sm ml-3' >
                             <i className="far fa-trash-alt" onClick={()=>{
                                  if(window.confirm('Do you Want to Remove ?')){
                                        handleRemove(item.wishID)
                                        handleWishList()
                                }
                             }}></i>
                         </button>
                        </div>
                    </div>
                </div>
                  )
             })}
             </div> 
             </div>
            </div>
        </div>
)
}
const mapStateToProps = (state) => ({
   
    user:state.user,
 
    
  })
export default connect (mapStateToProps,null)(WishList);