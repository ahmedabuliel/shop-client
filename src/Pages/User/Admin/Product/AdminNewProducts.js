import React, { useState,  useEffect,  } from 'react';
import { useSelector } from "react-redux";
import NavBarSideAdmin from '../../../../Component/Navs/NavBarSideAdmin'
import {  Spin ,Select, Input,Checkbox ,Button,Modal} from 'antd';
import {getCategories} from '../../../../actions/categories'
import {createProduct} from '../../../../actions/products'
import FileUpload from './FileUpload'
import VarietSelect from './VarietSelect';
import VarietModal from '../../../../Component/Modal/VarietModal'
import { toast } from 'react-toastify';
const initialState = {
    title: "",
    description: "",
    price: '',
    topSale:false,
    category: null,
    images: [],
   variets:[]
   
  };
const AdminNewProducts = () => {
    const { Option } = Select;
    const { TextArea } = Input;
    const { user } = useSelector((state) => ({ ...state }));
    const [loading, setLoading] = useState(false);
    const [values, setValues]=useState( initialState)
    const [categorylist,setCategorylist]=useState([])
    const [varietsSelected,setVarietsSelected]=useState([])
    const [flag,setFlag]=useState(false)
    const handleChange =e =>{
        if(e.target.name=='topSale')
        {
            setValues({...values, [e.target.name]:e.target.checked})
        }
        else{
        setValues({...values, [e.target.name]:e.target.value})
    
            }
        }
    const handleChangeCat =e =>{
       
          setValues({...values, category:e})
      }
    
    const loadCategories=async()=>{
     
        setCategorylist(await getCategories()) 
    
    }
    const handleSubmit=async e=>{
        e.preventDefault();
        if(values.images.length==0 || values.category==0){
            values.images.length==0 && toast.warn("Must Have Product Image at least one image ")
            values.category==0 && toast.warn("Must Choose Category For Product ")
        }
        else {
            setLoading(true)
       await  createProduct(values, user.token)
        setValues({ title: "",
        description: "",
        price: '',
        topSale:false,
        category: 0,
        images: [],
       variets:[]})
        setVarietsSelected([])
        
        setLoading(false)
       
    }
}
    useEffect(() => {
        loadCategories()
     }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                 <div className="col-md-2">
                    < NavBarSideAdmin />
                </div>
        <div className="col">
          {loading ? ( 
               <h4 className="text-danger">  <Spin /></h4>
              ) :
      
        <div className="container p-5 col-10">
        <h2 className="topTitle mx-auto">Add New Product </h2>
        <form className="login col-md-12"  onSubmit={e=>handleSubmit(e)} > 
          
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Title</span>
                </div>
                <Input type="text"  onChange={e=> handleChange(e)} value={values.title} className="form-control col-12" 
                placeholder="Product Title" name='title'    required/>
           </div>
           <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label  >Product Category : </label>
                </div>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select Category"
                    optionFilterProp="children"
                    onChange={e=> handleChangeCat(e)}
                    name='category'
                    value={values.category}
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                  
                >
                     {categorylist&& categorylist.map((c,index) => {
                         return (   <Option key={c.ID} value={c.ID}>{c.Name}</Option>)
                     })}
                     </Select>
                     <div className="input-group-prepend ml-4 ">
                    <span className="input-group-text">Price :</span>
                </div>
                <Input type="number"  onChange={e=> handleChange(e)} value={values.price} className="form-control col-6" 
                placeholder="Product Price" name='price'    required/>
           </div>
         
           <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label>Description:</label>
                </div>
                <TextArea
                    name='description'
                    value={values.description}
                    onChange={e=> handleChange(e)}
                    placeholder="Product Description "
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    />
           </div>
           <div className="input-group mb-3">
                
           <Checkbox name='topSale' onChange={e=> handleChange(e)} >Product Top Sale</Checkbox>
           </div>
           <div className="input-group mb-3">
                <div className="col-md-12">
                <label   className="input-group-prepend">Images Upload</label>
                  {loading && <Spin/>}      
                   {!loading && <FileUpload
                    values={values} 
                    setValues={setValues}
                    setLoading={setLoading}
                    user={user}
                    />}

                    </div>
           </div>
          
          < VarietSelect flag={flag} setFlag={setFlag} varietsSelected={varietsSelected} setVarietsSelected={setVarietsSelected} values={values} setValues={setValues} setLoading={setLoading}/>
               
          {values.variets.length>0 && <VarietModal  values={values} setValues={setValues} varietsSelected={varietsSelected} setVarietsSelected={setVarietsSelected}/>}
    
            <div className="input-group mb-3">
                
            <button className="btn btn-outline-primary">Add New Products </button>
        </div>

        </form>
        </div>
        }
        </div>
        </div>
        </div>
    )
}

export default AdminNewProducts
