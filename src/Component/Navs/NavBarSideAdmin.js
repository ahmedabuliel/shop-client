import React from 'react';
import {  Navbar } from "react-bootstrap";
import { NavLink ,withRouter} from 'react-router-dom';


const  NavBarSideAdmin =()=>{
 
  

 
    return (
      <div  className="navbarside">
      < Navbar className="navbar flex-column"  >
      <NavLink  exact activeClassName="active-link" className='link ' to={'/admindashboard'}>Orders</NavLink>
      <NavLink  exact activeClassName="active-link" className='link ' to={'/admindashboard/category'}>Category</NavLink>
      <NavLink  exact activeClassName="active-link" className='link' to={'/admindashboard/variets'}>Variets </NavLink>
      <NavLink  exact activeClassName="active-link" className='link' to={'/admindashboard/product/new'}>New Product </NavLink>
      <NavLink  exact activeClassName="active-link" className='link' to={'/admindashboard/products'}>Products </NavLink>

      </ Navbar>
      </div>
    );
  

}
const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  user:state.user.user
})
export default  withRouter( NavBarSideAdmin);