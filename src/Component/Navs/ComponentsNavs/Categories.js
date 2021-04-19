import React,{useEffect,useState} from 'react';
import { getCategories} from '../../../actions/categories'
import {  Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Categories = ()=>
{
    const [categories,setCategories]=useState([])
    const loadCategories=async()=>{
      setCategories(await getCategories())
    }

  
    useEffect(() => {
      
     loadCategories()
    }, [])
    return(
      
        
      <>
        <h3>Categories</h3>
        <Link  exact activeClassName="active-link-cat" className='link ' to= '/'>All Products</Link>
      {   (categories)? 
          < Navbar className="navbar flex-column"  >
          {categories.map((cat) => {
            
          return (
               <Link key={cat.ID} exact activeClassName="active-link-cat" className='link ' to= {`/products/${cat.ID}`}>{cat.Name}</Link>
          )  
             
          
                  
        })
        } 
         </ Navbar>
          :<span>No Categories</span> } 
    </>

      
    )
}


export default Categories;