import { GET_CART } from './types';
import axios from 'axios'
import {API} from '../config'
import { toast } from 'react-toastify';
import { userCart,getUserCart} from './user'


export const addItem=(product,token )=> {
    let flag=false
    let cart = [];

    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        
            
       if(cart.length==0 ){
        cart.push({
           ... product
        });
        toast.success('The product Added to the cart ')
       }
       else
      {   //checking if there the same ID && the same variets of the product 
            cart.forEach(item =>{  
                if(product.product.ID == item.product.ID){
                    if(JSON.stringify(product.selectedVari) ==JSON.stringify( item.selectedVari)) {
                        flag=true
                        toast.info('You have already added the product before')
                        if(product.amount != item.amount){   
                            toast.success('The Amount Updated ')
                            item.amount=product.amount
                        }
                    }
                }
               
            });
         
            if(!flag){ 
                cart.push({...product})
                toast.success('The product Added to the cart ')
         }
      
        

       
    }
   
    localStorage.setItem('cart', JSON.stringify(cart));
 userCart(cart,token)
      .then((res) => {
        console.log("CART POST RES", res);
       
      })
      .catch((err) => console.log("cart save err", err));
  };
}


export const getCart = token =>  async dispatch =>{
    let cart =[];
    
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
           cart=JSON.parse(localStorage.getItem('cart'));
           dispatch({
            type:GET_CART,
            payload:cart
        })
        return cart
          
        }
        else {
            if(token){
                
            const res = await getUserCart(token)
            localStorage.setItem('cart', JSON.stringify(res));
            dispatch({
                type:GET_CART,
                payload:res
            })
           
            }
        }
    }
    
   return[]
};

export const updateCart =(amount,product,token )=>{
    console.log('hii')
    let cart=[];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
           cart=JSON.parse(localStorage.getItem('cart'));
           cart.forEach(item =>{  
            if(product.product.ID == item.product.ID){
            
                if(JSON.stringify(product.selectedVari) ==JSON.stringify( item.selectedVari)) {
                    if(product.amount == item.amount){  
                     
                        toast.success('The Amount Updated ')
                        item.amount=amount
                    }
                }
            }
         });

        }       
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    userCart(localStorage.getItem('cart'),token)
      .then((res) => {
        
        
      })
      .catch((err) => console.log("cart save err", err));
      
}
export const removeCart=(product,token)=>{
    let cart = [];

    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((item, i) => {
           
            if (JSON.stringify(item) == JSON.stringify(product)) {
             
                cart.splice(i, 1);
            }
        });
      
        localStorage.setItem('cart', JSON.stringify(cart));
        userCart(cart,token)
      .then((res) => {
        console.log("CART POST RES", res);
       
      })
      .catch((err) => console.log("cart save err", err));
    }
   
};

export const emptyCart =async(token)=>{
  try {const headers = {
        "Content-Type":'application/json',
        "Authorization": `Bearer ${token}`
    } 
  const res=await axios.get(`${API}/emptyCart`,{headers})
       console.log(res)
       
    }
    

catch(err){
    console.log(err)
}
}

