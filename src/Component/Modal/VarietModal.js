import React, { useState } from 'react';
import { Modal, Button, Select ,Avatar, Image,Input } from 'antd';
import { useSelector } from "react-redux";

import { UPLOAD} from "../../config" 
import InputPrice from './InputPrice';
const { Option } = Select;
const VarietModal =({values,setValues,varietsSelected,setVarietsSelected}) => {
const [visible, setVisible] = useState(false);
const [confirmLoading, setConfirmLoading] = useState(false);
const [priceVariet,setVarietPrice]=useState()
const { variets } = useSelector((state) => ({ ...state }));
const showModal = () => {
    setVisible(true);
    };  
const handleOk = () => {
    setVisible(false);
    setConfirmLoading(false);
};

const handleCancel = () => {

setVisible(false);
};
const ImgChange = (e,vari) => {
const temp=varietsSelected
temp.map((v)=>{
    if(v==vari)
    {
        return v.filename=e
    }

})
setVarietsSelected(temp)
setValues({...values, varietsSelected:varietsSelected})
};
const priceChange = (e,vari) => {
setVarietPrice(e.target.value)
const temp=varietsSelected
temp.map((v)=>{
    if(v==vari)
    {
        return v.price=e.target.value
    }

})
setVarietsSelected(temp)
setValues({...values, varietsSelected:varietsSelected})

};
console.log(varietsSelected)
return (
<>
    <Button type="primary" onClick={showModal}>
    Open Variet Options
    </Button>
    <Modal
    title="Variet Options"
    visible={visible}
    onOk={handleOk}
    confirmLoading={confirmLoading}
    onCancel={handleCancel}
    
    >
        <table className="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Value</th>
            <th scope="col">Variet Image</th>
            <th scope="col">Variet Price</th>
            </tr>
        </thead>
        <tbody>
    {varietsSelected && varietsSelected.map((vari,index)=>{
       
        return (
        <tr key={index}>
            <th scope="row">{vari.ID}</th>
            <td>{vari.title}</td>
            
                <td style={{"background":`${vari.value}`}}>{vari.value}</td>
            
            <td>  
                <Select
                style={{ width: 200, }}
                placeholder="Select A Product Image"
                onChange={e=>ImgChange(e,vari)} 
                value={vari.filename}
                >
                {values.images && values.images.map((image ,index)=>{
                        return (
                <Option value={image}  key={index} style={{ textAlign:'center' }}> 
                    <Avatar
                    size="large" 
                    shape="square"
                        src={<Image src={`${UPLOAD}${image}`} />}
                        />
                </Option>
                        )
                    })}
                
            </Select>
            </td>
            <td>
            <InputPrice priceChange={priceChange} vari={vari}/>
            </td>
        </tr>
    )
    })}
    </tbody>
    </table>
    </Modal>
</>
);

}
export default VarietModal
