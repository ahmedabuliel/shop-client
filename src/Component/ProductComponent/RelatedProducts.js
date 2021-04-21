import React, { useState, useEffect } from 'react';
import {getRelatedProducts} from '../../actions/products'
import {UPLOAD} from '../../config'
import {Link} from 'react-router-dom';
import { Card, Avatar } from 'antd';
const { Meta } = Card;
const RelatedProducts = ({productID,catID,relatedProducts,setRelatedProducts})=>{
  

    const loadproducts=async()=>{
        setRelatedProducts(await getRelatedProducts(productID,catID))
    }
    useEffect(() => {
       loadproducts()
    }, [productID])
    return <>
      <h3 className="my-4">Related Products</h3>
      
      <div className="row relatedRow">
        {relatedProducts && relatedProducts.map((product)=>{
            return (
                <Link key ={product.ID} exact to={{pathname:`/product/${product.ID}`}}> 
                 <Card
    style={{ width:300,margin:10 }}
    cover={
      <img
        alt="example"
        src={`${UPLOAD}${product.Filename}`}
      />
    }
    
  >
    <Meta
     
      title={product.Title}
      description={`${product.Price}₪`}
    />
  </Card>,
                </Link>
            )
        })}
      
    
      </div>
    </>
}
export default RelatedProducts;