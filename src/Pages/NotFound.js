import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="container-fluid" >
     <div className='row'>
     <div className='col-md-12 center'>
             <h1 className="topTitle mx-auto">404 - Not Found!
             <br/><Link to="/">
    Back to The Shop
    </Link></h1>
      <img src="/images/404.jpg"/>
    </div>
    <div className='row'>
   
  </div>
    </div>
  </div>
);

export default NotFound;