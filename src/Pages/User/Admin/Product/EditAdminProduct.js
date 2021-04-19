import React, { useState,  useEffect,  } from 'react';
import { useSelector } from "react-redux";
import NavBarSideAdmin from '../../../../Component/Navs/NavBarSideAdmin'
import {  Spin ,Select, Input,Checkbox } from 'antd';
import {getCategories} from '../../../../actions/categories'
import {getProduct,getProductImages,getVariets, updateProduct} from  '../../../../actions/products'
import FileUpload from './FileUpload'
import VarietSelect from './VarietSelect';
import VarietModal from '../../../../Component/Modal/VarietModal'
import { toast } from 'react-toastify';
import { Link, Redirect } from 'react-router-dom';

const initialState = {
    title: "",
    description: "",
    price: '',
    topSale:false,
    category: 0,
    images: [],
   variets:[],
   cover:""
  };
const EditAdminProduct = ({match,history}) => {
    const { Option } = Select;
    const { TextArea } = Input;
    const { user } = useSelector((state) => ({ ...state }));
    const [loading, setLoading] = useState(false);
    const [values, setValues]=useState( initialState)
    const [categorylist,setCategorylist]=useState([])
    const [varietsSelected,setVarietsSelected]=useState([])
    const [product,setProduct]=useState();
    const [productImages,setImages]=useState();
    const [productVariets,setVariets]=useState();
   const [flag,setFlag]=useState(false)
    
    useEffect(() => {
     loadProduct();
     loadCategories()
    
   }, [])
   useEffect(() => {
    loadValues()
   
  }, [product,productVariets,productImages])
   const loadProduct=async() =>{
   
    setProduct(await getProduct(match.params.productID))
    setVariets(await getVariets(match.params.productID) )
    setImages(await getProductImages(match.params.productID))
   
    
   }
  
   const loadValues=()=>{
setFlag(true)
  let {title,images,description,category,price,variets,topSale,cover}=values
      if(product) {
          title=product[0].Title
          description=product[0].Description
          category=product[0].Category
          topSale=product[0].topSale
          price=product[0].Price
    }
    if(productVariets){
        let index=-1
        productVariets.forEach(vari => {
           vari.res.forEach(v=>{
            index= values.variets.findIndex(x => x==v.varietsID)   
            if(index==-1)  variets.push(v.varietsID)
           })
        });
    }
    if(productImages)
    {   let index=-1
        productImages.forEach(image => {
          index= values.images.findIndex(i=>i==image.Filename)
         
            if(index==-1) images.push(image.Filename)
            if(image.Cover==1) cover=image.Filename
        });
    }
  
      setValues({...values, title, description,category, topSale,price, images, variets,cover})
  
   } 
   
 

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
      await  updateProduct(values,match.params.productID, user.token)
      setLoading(false)
      history.push('/admindashboard/products')
 
    }
}
   

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
        <h2 className="topTitle mx-auto">Edit  Product </h2>
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
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                  value={values.category}
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
                
            <button className="btn btn-outline-primary">Save The Changes </button>
        </div>

        </form>
        </div>
        }
        </div>
        </div>
        </div>
    )
}

export default EditAdminProduct;
