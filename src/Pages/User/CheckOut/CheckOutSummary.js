import React ,{useState,useEffect} from 'react';
import { TAX} from '../../../config'
import {finalPrice} from '../../../actions/products'
import Table from 'react-bootstrap/Table'
 const CheckOutSummary = ({items , total,tax}) => {
    return (
        <div>
             <h5>Order Summary</h5>
                  <hr />
          <p>Products</p>
          <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Product Title</th>
                        <th>Variets</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items && items.map((p,i)=>{
                            return <tr key={i}>
                            <td>{i+1}</td>
                            <td>{p.product[0].Title}</td>
                            <td >
                            {p.selectedVari.map((s,index)=>{
                                return <>{`${s.item.title} : ${s.item.value}`}<br/></>
                            })
                           }
                           </td>
                            <td>{finalPrice(p)}₪</td>
                            <td>{p.amount}</td>
                            <td>{finalPrice(p)*p.amount}₪</td>
                            </tr>
                        })}
                        
                       
                    </tbody>
                    </Table>
                  <hr />
               Before Tax : {(total-tax).toFixed(2)}₪ 
                <hr />
                Tax ({`${TAX}`}) : {tax.toFixed(2)}₪ 
                <hr />
                Total: <b>{total.toFixed(2)}₪</b>
             <hr />
        </div>
    )
}
export default CheckOutSummary
