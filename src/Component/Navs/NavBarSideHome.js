import React ,{useState,useEffect}from 'react';
import Categories from './ComponentsNavs/Categories'
import PriceFilter from './ComponentsNavs/PriceFilter'
import RatingFilter from './ComponentsNavs/RatingFilter'
import {setProductsFilter} from '../../actions/products'
import {connect } from 'react-redux'
import {  Nav,Navbar,NavDropdown } from "react-bootstrap";
const NavBarSideHome =({setProductsFilter})=>{
    const [priceFilter, setPriceFilter]=useState([0,0])
    
    const [ratingFilter, setRatingFilter]=useState([0,0])
    const [filter,setFilter]=useState({
        priceFilter,
        ratingFilter
    })
    setProductsFilter(filter)
    useEffect(() => {
       setFilter({
        priceFilter,
        ratingFilter
       })
      
       
    }, [priceFilter,ratingFilter])
   
    return (<>
       
       <div className="col-lg-3 categories">
         
       <Navbar className="navbar navbar-expand-lg  fixed-right navbar-side" collapseOnSelect expand="lg" >
       <Navbar.Toggle aria-controls="basic-navbar-nav " className="navbar-side" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="navbar-nav ml-auto">
        <ul className="list-group">
        <Categories/>
        <hr/>
        <h5>Filter By Price</h5>
        <PriceFilter setPriceFilter={setPriceFilter}/>
        <hr/>
        <h5>Filter By Ratings</h5>
        <RatingFilter setRatingFilter={setRatingFilter}/>
        <hr/>
        </ul>
    </Nav >
        </Navbar.Collapse>
        </Navbar>
        </div>
        </>
        
    )
}
export default connect (null,{setProductsFilter})(NavBarSideHome);