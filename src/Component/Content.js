
import React, { useState ,useEffect} from 'react'
import Product from './Product';
import { Spinner } from "react-bootstrap";
import {getProducts} from '../actions/products'

  

const Content =(props)=>{

  const [products,setProducts]=useState([]);
  const [isLoading,setLoading]=useState([false])
 
 
  const catID=props.match.params.catID
  
  const loadProducts=async ()=>{
    
    setLoading(true) 
    
    
    if(catID)
    setProducts(await getProducts(catID))

  else setProducts(await getProducts())
    setLoading(false)
  }

useEffect(() => {
  loadProducts()
},[catID])
  return (
        <div className="col-lg-9">
            
          
     
        {
          (isLoading)?<div>  <Spinner animation="border" variant="danger" /></div>:
          (products!== undefined)   ? 
          <div className="row rowProduct">
          
         {
            products.map((product)=>{
            
            return  <Product key={product.ID} product={product}  />
            })
            }   
          </div> :null
        }
     
        
     
      </div>
    )
}


export default Content;