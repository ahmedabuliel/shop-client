import React ,{useState,useEffect} from 'react';
import {finalPrice} from '../../../../actions/products'
const OrderTable =({order})=>{
 
    return( 
    <table className="table table-striped">
         <thead>
            <tr>
                
                <th scope="col">Title</th>
                <th scope="col">Variets</th>
                <th scope="col">Amount</th>
                <th scope="col">Price</th>
            </tr>
         </thead>
         <tbody>
         { order.Items.map((i,index)=>{return (
         <tr key={index}>
         <td>
             {i.product[0].Title}
         </td>
         <td>
             <span className='tableVariets'>
             {i.selectedVari.map((s,i)=>{
                if (s.item.chk==1)
                return <p  key ={i} style={{"backgroundColor":`${s.item.value}`}}>{` ${s.item.title} : ${s.item.value} `}</p>
                else return <p key ={i}>{` ${s.item.title} : ${s.item.value} `}</p>
                })}
                </span>
         </td>
            <td>{i.amount}</td>
            <td>{finalPrice(i)}₪</td>
            </tr>
          ) })}
         </tbody>
    </table>
    )
}
export default OrderTable