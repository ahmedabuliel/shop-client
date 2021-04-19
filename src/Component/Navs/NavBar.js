import React ,{useState,useEffect}from 'react';
import {  Nav,Navbar,NavDropdown } from "react-bootstrap";
import { NavLink ,withRouter} from 'react-router-dom';
import {signout} from '../../actions/user';
import { useHistory } from "react-router-dom";

/* import {getcartLength} from '../../actions/cart' */
import {connect } from 'react-redux'
import {UPLOAD} from '../../config'
import Search from './Search'
 const NavBar =({isAuthenticated,user,signout,cart}) =>{
  
  const [itemsCartNo,setItemsCartNo]=useState(0);
  let history = useHistory();
  
  useEffect(() => {
    
    setItemsCartNo(cart.length)
  })
  const logout = () => {
  
    signout()
  }
return (
  <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" collapseOnSelect expand="lg" >
    
  <div className="container-fluid">
      <Navbar.Brand href="/">
          <img alt='logo' src='/images/logo.png' width='50' height='50'/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" bg="dark" />
      <Navbar.Collapse id="basic-navbar-nav">
      <NavLink  exact activeClassName="active-link" className='link ' to={'/'}>Home</NavLink>
      {isAuthenticated && <NavLink  exact activeClassName="active-link" className='link ' to={'/userdashboard/cart'}>
        <i className="fas fa-shopping-cart">
          <span className="badge badge-success">{itemsCartNo}</span>
          
          </i>
      </NavLink>}
      <Nav className="navbar-nav ml-auto">
      <Search history={history}/>
     
      {!isAuthenticated &&<>
      <NavLink  exact activeClassName="active-link" className='link float-right' to={'/LogInForm'}>Log In </NavLink>
      <NavLink  exact activeClassName="active-link" className='link float-right' to={'/RegisterForm'}>Register </NavLink>
      </>} </Nav>
     
      {isAuthenticated && <Nav >
     

          {
          user.role==0 &&
          <NavDropdown className='nav-Dropdown ' title=
          {user.profile_image=='' && <img className='profileImg' src={`/images/profileAvatar.png`}/> 
          || !user.profile_image=='' && <img className='profileImg' src={`${UPLOAD}${user.profile_image}`}/>}
          id="collasible-nav-dropdown"> 
           
          <NavDropdown.Item exact activeClassName="active-link "  className='link link_dropDown p-0' href={'/userDashboard'}> {user.name} </NavDropdown.Item>
          <NavDropdown.Divider  />
          <NavDropdown.Item  className='link link_dropDown p-0' onClick={logout}>Log Out </NavDropdown.Item>
        
        </NavDropdown>

        
          }
           {
          user.role==1 &&
          <NavDropdown className='nav-Dropdown ' title=
          {user.profile_image=='' && <img className='profileImg' src={`/images/profileAvatar.png`}/> 
          || !user.profile_image=='' && <img className='profileImg' src={`${UPLOAD}${user.profile_image}`}/>} 
          id="nav-dropdown"> 
           
          <NavDropdown.Item exact  className='link link_dropDown p-0 text-center ' href={'/adminDashboard'}> {user.name} </NavDropdown.Item>
          <NavDropdown.Divider  />
          <NavDropdown.Item  className='link link_dropDown p-0 text-center' onClick={logout}>Log Out </NavDropdown.Item>
        
        </NavDropdown>

        
          }
          
        
          </Nav>
    }
   
     
      </Navbar.Collapse>
  </div>
 
</Navbar>


)
}
const mapStateToProps = (state,ownProps) => ({
  isAuthenticated: state.user.isAuthenticated,
  user:state.user.user,
  cart:state.cart,
  
  
})
export default connect(mapStateToProps,{signout})(withRouter( NavBar));
