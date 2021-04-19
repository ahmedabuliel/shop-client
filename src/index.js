import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router} from 'react-router-dom';
import'./css/shop-homepage.css' ;
import store from './store'
import {Provider} from 'react-redux'

ReactDOM.render(
  
    <Router>
      <Provider store={store} >{/* Sending the store to app */}
        <App  />
      </Provider>
    </Router>
 ,
   
 document.getElementById('root')
);

