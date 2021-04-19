import React from 'react';
import {  Navbar } from "react-bootstrap";
import { NavLink ,withRouter} from 'react-router-dom';


const  NavBarSide =()=>{
 
  

 
    return (
      <div  className="navbarside">
      < Navbar className="navbar flex-column"  >
      <NavLink  exact activeClassName="active-link" className='link ' to={'/userdashboard'}>Orders</NavLink>
      <NavLink  exact activeClassName="active-link" className='link' to={'/userdashboard/cart'}>Cart </NavLink>
      <NavLink  exact activeClassName="active-link" className='link' to={'/userdashboard/wishlist'}>Wishlist </NavLink>
      <NavLink  exact activeClassName="active-link" className='link' to={'/userdashboard/userprofile'}>Profile </NavLink>
      </ Navbar>
      </div>
    );
  

}
const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  user:state.user.user
})
export default  withRouter( NavBarSide);