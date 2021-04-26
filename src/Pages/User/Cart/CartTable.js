import {getCart} from '../../../actions/cart'
import React, { useState ,useEffect} from 'react'
import TDTableAmount from './TDTableAmount'
import TDTablePrice from './TDTablePrice'
import CartCruds from './CartCruds'
import {connect } from 'react-redux'
import {Link} from 'react-router-dom';
import { UPLOAD } from '../../../config'
import {finalPrice} from '../../../actions/products'
const CartTable =({getCart,user,cartState})=>{
    const [cart,setCart]= useState(cartState)
    const[edit,setEdit]=useState({index:-1,edit:false})
    console.log(cartState)
    const [nAmount,setNamount]= useState(1)
   
   const imageProduct=item=>{
       let  url= item.imageUrl
      
     if( item.selectedVari.length==0){
     
      url= item.imageUrl
       
     }
      else  {
       
       item.selectedVari.forEach((i,index)=>{
        if(i.item.filename!=null)
        url =i.item.filename
       
    })
  }
   
    return url
   }
   
    const handleGetCart=async()=>{
      const res=await getCart(user.token);
       setCart(res)
    }
    const handleEditClick=(index)=>{
        setEdit({index,edit:!edit.edit})
      
    }
    const changeAmount =(amount )=>{
        setNamount(amount);
    }
  
    
     useEffect(() => {
       handleGetCart();

    }, [edit]) 
   console.log(cartState)
    return (
    <div className='row'>
        {cartState.map((item,index) => {
       
           
          return  <div  key ={index} className='col-lg-4'>
                <div className="card  " >
              
                <img src={`${UPLOAD}${imageProduct(item)}`}
                 
                className="card-img-top img-cart " alt="..."/>
                    <div className="card-body">
                      <Link exact to={{pathname:`/product/${item.product[0].ID}`}}>
                      <h5 className="card-title">{item.product[0].Title}</h5>
                      </Link>
                        {item.selectedVari && item.selectedVari.map((i,index)=>{
                           
                    return  (i.item.chk)?<p className="card-text" key= { index}style={{textTransform: "capitalize",background:i.item.value}}>{i.item.title} : {i.item.value}</p>:
                    <p className="card-text" key= { index}style={{textTransform: "capitalize"}}>{i.item.title} : {i.item.value}</p>
                })}
                    <TDTableAmount edit={edit} amount={item.amount} index={index} changeAmount={changeAmount}/>
                     <p className="card-text"> Price:₪{finalPrice(item)}
                    </p>
                   
                      <p className="card-text"> 
                      <TDTablePrice amount={item.amount} price={finalPrice(item)}/>
                      </p>
                       <CartCruds  handleGetCart ={ handleGetCart} handleEditClick={handleEditClick} index={index} edit={edit} product={item} amount={nAmount} token={user.token}/>
                    </div>

              </div>
              </div>
              
        })}</div>
        
       
    )
}
const mapStateToProps = (state) => ({
   
    user:state.user,
   cartState:state.cart
    
  })
export default connect (mapStateToProps,{getCart})(CartTable);