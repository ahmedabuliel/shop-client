import react  from 'react'
import {updateCart,removeCart} from '../../../actions/cart'
import {  useDispatch } from "react-redux";
import {GET_CART} from '../../../actions/types'
const CartCruds =(props)=>{
    const dispatch = useDispatch();
if (props.edit.edit && props.edit.index==props.index)
    return   <div className='cruds'>
               
            <button  className='btn btn-outline-danger btn-sm ml-3' onClick={()=>props.handleEditClick(props.index)}>
                 <i className="fas fa-undo"></i>
            </button>
            <button className='btn btn-outline-danger btn-sm ml-3' onClick={()=>{
                updateCart(parseInt(props.amount),props.product,props.token)
                
               /*  dispatch({
                    type:GET_CART,
                    payload:localStorage.getItem('cart')
                }) */
                props.handleEditClick(props.index)
                props. handleGetCart()
            }
                                                                                }>
                    <i className="far fa-save"></i>
            </button>
        </div>
    else return (
        <div className='cruds'>
            <button className='btn btn-outline-danger btn-sm ml-3' onClick={()=>props.handleEditClick(props.index)}>
                <i className="far fa-edit"></i>
            </button>
            <button className='btn btn-outline-danger btn-sm ml-3' onClick={()=>{ 
                if(window.confirm('Do you Want to Remove ?')){
                    removeCart(props.product,props.token) 
                    props. handleGetCart()}
                    }}>
                <i className="far fa-trash-alt"></i>
            </button>
        </div>
        )
}
export default CartCruds