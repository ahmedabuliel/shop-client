    
import {combineReducers} from 'redux'


import {variets} from './variets'
import {user} from './user'
import {cart} from './cart'
import {filter} from './filter'


export default combineReducers({
 
   variets,
   user,
   cart,
   filter
  
})