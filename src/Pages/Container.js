
import React ,{useState,useEffect}from 'react';
import Carousel from '../Component/Carousel';
import Categories from '../Component/Navs/ComponentsNavs/Categories'
import NavBarSideHome from '../Component/Navs/NavBarSideHome'
import Content from '../Component/Content'

import {Route, Switch} from 'react-router-dom';


const Container=() =>{
 
  
return(
    <>
    <div className='container-fluid'>
         
         {/* Showing the Carousel Slider of the top products  */}
         <Carousel /> 
    </div>
    
      <div className="container" >
        <div className="row">

         <NavBarSideHome/>
          <Switch>
            {/* showing the products cards by category or all the products  */}  
            <Route exact path="/products/:catID" component ={Content}/>
          
            <Route  exact path="/" component ={Content}/>
          </Switch>
          
        </div>
      </div>
</>
)
}

export default  Container;