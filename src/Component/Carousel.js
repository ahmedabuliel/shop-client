
import React, { useState ,useEffect} from 'react'
import {Link} from 'react-router-dom';
import Slider from "react-slick";

import {getTopProducts} from '../actions/products'
import { UPLOAD } from '../config';

const Carousel=()=>{
  const [products,setProducts]=useState([]);
  const [isLoading,setLoading]=useState([false])
  const loadProducts=async ()=>{
    
    setLoading(true) 
    setProducts(await getTopProducts())
    setLoading(false)
  }

useEffect(() => {
  loadProducts()
},[])
  //seeting of the carousel
  var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        initialSlide: 0,
        autoplay: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

   
return (
<>
<h1 className="topSaleTitle">Product Top Sale </h1>
<div className="topSale col align-self-center">
    <Slider {...settings}>
          
         {(products!==undefined)?
             products.map((product)=>{
           return (
            <Link key ={product.ID} exact to={{pathname:`/product/${product.ID}`}}> 
           <div key = {product.ID}className="topSaleinner" > 
              <img alt='product image' className='imgSlider' src={`${UPLOAD}${product.Filename}`} />
              <div className='infoTopSale'>
                <h3>{product.Title}</h3>
                <span>{product.Price} ₪</span>
              </div>
           </div>
           </Link>
          )}):null}
        
    </Slider>
    </div>
</>
)    
}
// getting all the products from the store and filtering to only topsale products


export default Carousel;