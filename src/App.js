import './App.css';
import React,{useEffect,lazy, Suspense} from 'react'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {  Spin  } from 'antd';
import {Route, Switch,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';


import {loadUser} from './actions/user'
import {getVariets} from './actions/variets'
import {getCart} from './actions/cart'

import { ToastContainer } from 'react-toastify';

import store from './store'
import UpdateVariets from './Pages/User/Admin/UpdateVariets' 
import UpdateVarietsTitle from './Pages/User/Admin/UpdateVarietsTitle' 
import UserRoute from './Component/Routes/UserRoute'
import AdminRoute from './Component/Routes/AdminRoute'
import UpdateCategory from './Pages/User/Admin/UpdateCategory'
import UpdatePassword from './Pages/Auth/UpdatePassword'
import EditAdminProduct from  './Pages/User/Admin/Product/EditAdminProduct';
import CheckOut from './Pages/User/CheckOut/CheckOut'
const NotFound =lazy(()=>import('./Pages/NotFound')) 
const Container =lazy(()=>import ('./Pages/Container')) 
const NavBar =lazy(()=>import('./Component/Navs/NavBar')) 
const ProductPage =lazy(()=>import('./Pages/Products/ProductPage')) 
const LoginForm =lazy(()=>import('./Pages/Auth/LoginForm')) 
const RegisterForm =lazy(()=>import( './Pages/Auth/RegisterForm'))
const ForgotForm =lazy(()=>import('./Pages/Auth/ForgotForm')) 


const UserOrders =lazy(()=>import('./Pages/User/Orders/UserOrders')) 
const ProfileForm =lazy(()=>import('./Pages/User/ProfileForm')) 
const Cart =lazy(()=>import('./Pages/User/Cart/Cart')) 
const WishList =lazy(()=>import('./Pages/User/WishList/WishList')) 

const AdminOrders =lazy(()=>import( './Pages/User/Admin/Orders/AdminOrders'))

const  AdminCategory =lazy(()=>import('./Pages/User/Admin/AdminCategory')) 
const AdminVariets =lazy(()=>import('./Pages/User/Admin/AdminVariets')) 
const AdminProducts =lazy(()=>import('./Pages/User/Admin/Product/AdminProducts')) 
const AdminNewProducts =lazy(()=>import('./Pages/User/Admin/Product/AdminNewProducts'))


const App =({getVariets,getCart}) =>{
  useEffect(() => {
    getVariets();
   
    
  })
  useEffect(() => {
    let token = localStorage.getItem("token")

    if (token){
      store.dispatch(loadUser(token));
       getCart( localStorage.getItem("token"));
    }
  },[])
  return (
    <Suspense fallback={<div className="col text-center p-5"><Spin/></div>}>
    <div className="App">
      <ToastContainer />
      <NavBar /> {/* Showing the navbar  */}
      <Switch>
        {/* swithch between the home page and the product page by routing  */}
          <Route exact path="/logInForm"  component={LoginForm}/>
          <Route exact path="/forgotForm" component={ForgotForm}/> 
          <Route exact path="/registerForm"  component={RegisterForm}/>
          
         <Route exact path='/updatepassword/:token' component={UpdatePassword}/>

          <UserRoute exact path="/userdashboard" component={UserOrders} />
          <UserRoute exact path="/userdashboard/userprofile" component={ProfileForm}/>
          <UserRoute exact path="/userdashboard/cart" component={Cart}/>
          <UserRoute exact path="/userdashboard/wishlist" component={WishList}/>
          <UserRoute exact path="/checkout" component={CheckOut}/>

          <AdminRoute exact path='/adminDashboard' component={AdminOrders}/>
          <AdminRoute exact path='/admindashboard/category' component={AdminCategory}/>
          <AdminRoute exact path="/admin/category/:catId" component={UpdateCategory} />
          <AdminRoute exact path='/admindashboard/variets' component={AdminVariets}/>
          <AdminRoute exact path="/admin/variets/:variId" component={UpdateVariets} />
          <AdminRoute exact path="/admin/variets/title/:name" component={UpdateVarietsTitle} />
          <AdminRoute exact path='/admindashboard/product/new' component={ AdminNewProducts}/>
          <AdminRoute exact path='/admindashboard/products' component={ AdminProducts}/>
          <AdminRoute exact path = '/admindashboard/products/edit/:productID' component = { EditAdminProduct } />
          <Route exact path="/product/:proID"  component={ProductPage} />
          <Route   exact path="/products/:catID" component={ Container}/>
          <Route   exact path="/" component={ Container}/>
          <Route  component={NotFound} />
        
      
      </Switch>
    </div>
    </Suspense>
  );
}




export default connect(null,{getVariets,getCart})( App);
