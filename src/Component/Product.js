import React, { useState,useEffect  } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import { getRating} from '../actions/rating'
import StarRatings from 'react-star-ratings';
import WishListBtn from '../Component/ProductComponent/WishListBtn'
import { UPLOAD } from '../config';

const Product=({props,user,filter})=>{
  
    const [substr,setSubstr]=useState(true);
   const [rating,setRating] = useState(0) 
   const {priceFilter,ratingFilter}=filter

    let  ratingtemp =0;
    const product=props.product
  const loadRating=async()=>{
    ratingtemp =await getRating(props.product.ID)
    setRating(ratingtemp)

  }
  const showproduct=()=>{
    if(priceFilter[1]==0 && ratingFilter[1]==0)
    { 
      
     return  true
    }
    if(product.Price>=priceFilter[0] &&product.Price<=priceFilter[1]&& ratingFilter[1]==0)
    return  true
    if(rating.rating>=ratingFilter[0] &&rating.rating<ratingFilter[1]&& priceFilter[1]==0)
    return  true
    if(priceFilter[1]!=0 && ratingFilter[1]!=0){
    if(rating.rating>=ratingFilter[0] &&rating.rating<ratingFilter[1]&&product.Price>=priceFilter[0] &&product.Price<=priceFilter[1])
      return true
    }
   
}

  useEffect(() => {
    loadRating()
   
  }, [])
  useEffect(() => {
    showproduct()
   
  }, [filter])
   const longDescription=()=>{
       setSubstr(false);
   }
   
    return(<>
     { showproduct() && 
    <div className="col-lg-4 col-md-6 mb-4">
        <div className="card h-100">
        {/* sending to the product page  */}
        <Link exact to={{pathname:`/product/${props.product.ID}`}}>
            <img className="card-img-top" src={`${UPLOAD}${props.product.Filename}`} alt=""/>
        <div className="card-body">
            <h4 className="card-title">
            {props.product.Title}
            </h4>
            <h5>{props.product.Price} ₪</h5>
            <span>
                    { rating !=0 &&
                    <>  
                    <StarRatings  starDimension="20px"
                    starSpacing="2px"
                    starRatedColor="red"
                    rating={rating.rating}
                    editing={false} />
                     ({rating.length})
                       </>
                    }
                    { rating ==0 &&<>
                      <StarRatings  starDimension="20px"
                            starSpacing="2px"
                            starRatedColor="red"
                            rating={rating.rating}
                            editing={false} />
                        ({rating.length})
                    </>
                }
            </span>
           
            <div className="card-text">
                {(substr)?
                (props.product.Description.length > 100) ?

                <div>{props.product.Description.substr(0, 100-1) } <button className='substr' onClick={longDescription}> Read More...</button></div>  
             : props.product.Description:
             props.product.Description } </div>
            
        </div>
        </Link>
        {user.isAuthenticated && 
        <WishListBtn productID={props.product.ID} token={user.token}/>}
        </div>
  </div>}
 
  </>
  )
}
const mapStateToProps = (state,ownProps) => {
    return {
        props:ownProps,
        user:state.user,
      
        filter:state.filter
    } 
}
    
export default connect(mapStateToProps,null)(Product);