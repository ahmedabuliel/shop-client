import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner,} from "react-bootstrap";
import StarRatings from 'react-star-ratings';
import RatingModal from '../../Component/Modal/RatingModal'
import ImgGallery from "../../Component/ProductComponent/ImgGallery"; // getting the images gallery for the product 
import Variets from '../../Component/ProductComponent/Variets'
import WishListBtn from '../../Component/ProductComponent/WishListBtn'

import {getVariets,getProductImages,getProduct} from '../../actions/products'
import {getCart,addItem} from '../../actions/cart'
import {getRating} from '../../actions/rating'

const ProductPage=({isAuthenticated,props,getCart,user})=>
{
  //states
  const productID = props.match.params.proID; 
  const [productPrice,setProductPrice]=useState();
  const [loading,setLoading]=useState(false)
  const[selectedVari,setSelectedVari]=useState([]);
  const [finalVariets,setFinalVariets]=useState([])
  const[amount,setAmount] =useState(1)
  const [imageUrl,setImageUrl]=useState(); 
  const [selectedProduct,setSelectedProduct]=useState({})
  const [product,setProduct]=useState([]);
  const [images,setImages]=useState();
 
  const [rating,setRating] = useState(0) 
  const [wishlist,setWishlist] = useState(false) 
  //functions------------------------------------------------------------------------------->
   //function change the url of the main picture 
 const loadproduct=async()=>{
    setLoading(true);
    setProduct(await getProduct(productID))
    setImages(await getProductImages(productID))
    setRating(await getRating(productID))
    setLoading(false);


 }

   const changeUrl=(url)=>{
   
    setImageUrl(url)
  }

 
//function that changed the price by variets
  const handleVarietClick=((price)=>{
    if(price!=null){
      setProductPrice(price);
    }
  })
 
//function that changed the amount
  const handleChange=((e)=>{
   if(e.target.value==0){
     toast.info('minimum amount is 1')
   }
   else
    setAmount(parseInt( e.target.value))
  })
//function that added to the Cart 
 const addToCart=()=>{
  const numberVari=finalVariets.length;
  const index=selectedVari.findIndex(vari=>vari.active==false)
  
  if(selectedVari.length==numberVari){
  if(selectedVari && index==-1){
 
    addItem(selectedProduct,user.token);}
  else   toast.warn('You have to select all the variets!!')
  getCart(user.token);
  }
  else {
    toast.warn('You have to select all the variets!!')
  }
 }

 //function that importing the variets for the product 
 const importVariets=async (productID)=>{
 let v= await getVariets(productID)
    setFinalVariets(v)

 }

//<------------------------------------------------------------------
  //useEffect
  useEffect(() => {
    loadproduct()
    setProductPrice(product.Price)
    importVariets(productID);
    setSelectedProduct({
      product,
      selectedVari,
      amount,
      productPrice,
      imageUrl
  
    })
    
   
},[]);

    useEffect(() => {
     
      setSelectedProduct({
        product,
        selectedVari,
        amount,
        productPrice,
        imageUrl
    
      })
   
  },[amount,selectedVari,productPrice,  imageUrl]); 
 
   useEffect(()=>{
  
    if(images && images.length>0){
      setImageUrl(images[0].Filename)
   
    } 
  },[images])
  
  useEffect(()=>{
  
    loadproduct()
  },[productID])
 

    return (<>
    {loading && <div> <Spinner animation="border" variant="danger" /></div>}
   <div className="container-lg">
      {(product[0]) &&<>
         <h1 className="productTitle">{product[0].Title}
         
        </h1>
      
    
        <div className="row productContent align-self-center">
      
          <div className="col-md-8" >
            {(images && images.length >0  )?
              <ImgGallery images={images} imageUrl={imageUrl} changeUrl={changeUrl} />
              :null}
           
           <div className='variets col-md-12'>
               
               <Variets  variets={finalVariets} handleVarietClick={handleVarietClick} setVari={setSelectedVari}  changeUrl={changeUrl}/>
              
             </div>
            
          </div>
      
          <div className="col-md-4">
            <h3 className="my-3">Product Description</h3>
            <p>{product[0].Description}</p>
          
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
            
          <div className='col-md-12'>
          <div className='row'>
             <div className="col align-self-center">
                  <label htmlFor="amount" className="form-label">Amount</label>
                  <input type="number"  name="amount" value={amount} onChange={e=>handleChange(e) } placeholder="Amount" className="form-control amount" autoFocus />
              </div>
              
             </div>
             
             <div className="  price">
               
               <span>Price :{(productPrice!=undefined)? productPrice * amount: product[0].Price * amount}₪</span>
             </div>
               
              <div className='buttons'>
                
                {isAuthenticated &&<>
                <button className='btn btn-primary'>
                  <RatingModal star={rating.rating} productID={productID} rating={setRating}/>
                  </button>
                 <WishListBtn productID={productID} token={user.token}/>
               
               
                <button className='btn btn-warning' id='allowCart'   onClick={addToCart}><i className="fas fa-shopping-cart"></i></button>
               </>
                }
                {!isAuthenticated &&
                <Link  to={{pathname: "/LogInForm",
                state: props.location.pathname }}  className='btn btn-primary' >Sign In <i className="fas fa-sign-in-alt"></i></Link>
                }
                </div>
          </div>
          </div>
      
        </div>
     
        <h3 className="my-4">Related Projects</h3>
      
        <div className="row">
      
        
      
        </div>
     
            </>  }
        
      </div>
      </>
    )
}

const mapStateToProps = (state,ownProps) => {
return {
    props:ownProps,
    user:state.user,
    isAuthenticated:state.user.isAuthenticated

} 
}

 export default connect(mapStateToProps,{getCart})(ProductPage);