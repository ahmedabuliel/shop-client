import React,{useEffect,useState} from 'react';


const PriceFilter=(props)=>{
   
    const handleChange=e=>{
       
        const p = e.target.value.split(",")
  const i= p.map(i=>{
            return parseInt(i)
        })
       props.setPriceFilter(i)
       
    }
    
    return (<>
    <div className="form-check">
        <input className="form-check-input" type="radio" name="priceRadioDefault"  
        value={[0,0]}
        onChange={e=>handleChange(e)}/>
        <label className="form-check-label" >
        All The Price's
        </label>
    </div>
    <div className="form-check">
        <input className="form-check-input" type="radio" name="priceRadioDefault"  
        value={[0,1000]}
        onChange={e=>handleChange(e)}/>
        <label className="form-check-label" >
        0 ₪ to 1000₪
        </label>
    </div>
    <div className="form-check">
      <input className="form-check-input" type="radio" name="priceRadioDefault" 
      value={[1001,2000]}
      onChange={e=>handleChange(e)}/>
      <label className="form-check-label" >
      1000 ₪ to ₪2000
      </label>
    </div>
    <div className="form-check">
      <input className="form-check-input" type="radio" name="priceRadioDefault"  
      value={[2001,3000]}
      onChange={e=>handleChange(e)}/>
      <label className="form-check-label" >
      2000 ₪ to ₪3000
      </label>
    </div>
    <div className="form-check">
      <input className="form-check-input" type="radio" name="priceRadioDefault" 
      value={[3001,4000]}
      onChange={e=>handleChange(e)}/>
      <label className="form-check-label" >
      3000 ₪ to ₪4000
      </label>
    </div>
    <div className="form-check">
      <input className="form-check-input" type="radio" name="priceRadioDefault" 
      value={[4001,5000]}
      onChange={e=>handleChange(e)}/>
      <label className="form-check-label" >
      4000 ₪ to ₪5000
      </label>
    </div>
    <div className="form-check">
      <input className="form-check-input" type="radio" name="priceRadioDefault" 
      value={[5000,6000]}
      onChange={e=>handleChange(e)}/>
      <label className="form-check-label" >
      5000 ₪ to ₪6000
      </label>
    </div>
    <div className="form-check">
      <input className="form-check-input" type="radio" name="priceRadioDefault"  
      value={[6001,1000000000]}
      onChange={e=>handleChange(e)}/>
      <label className="form-check-label" >
      6000 ₪ and up
      </label>
    </div>
    </>
    )
}
export default PriceFilter