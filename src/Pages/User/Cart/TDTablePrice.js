import React ,{useState} from 'react'

const TDTablePrice=(props)=>{
return<p className="card-text"> 
  Total Price :₪ {props.amount * props.price }
 </p>
}
export default TDTablePrice