import React ,{useState,useEffect} from 'react'

const TDTableAmount =props=>{
  
    const [nAmount,setNamount]= useState(props.amount) 
    const handleChangeAmount= e=>{
         setNamount(e.target.value)
       
    }
    useEffect(() => {
        props.changeAmount(nAmount)
    }, [nAmount])
    if (props.edit.edit && props.edit.index == props.index){
        return <label>Edit Qty : <input className='editAmountInput' type="number" value={nAmount} onChange={e=>{handleChangeAmount(e) ;
        }} autoFocus min={1} /></label>
    }
    else return  <p className="card-text">Qty :  {props.amount}</p>
}
export default TDTableAmount;