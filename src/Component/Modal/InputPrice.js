import React, { useState } from 'react';
import {Input } from 'antd';
const InputPrice =({priceChange,vari}) => {
const [priceVariet,setVarietPrice]=useState(vari.price)
return <Input type="number"  onChange={e=> priceChange(e,vari)} value={priceVariet} className="form-control col-6" 
placeholder="Product Price" name='price'   />
}
export default InputPrice