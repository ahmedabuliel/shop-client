import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import NavBarSideAdmin from '../../../../Component/Navs/NavBarSideAdmin'
import { Link, Redirect } from 'react-router-dom';
import {getProducts,removeProduct} from '../../../../actions/products'
import {getCategories} from '../../../../actions/categories'
import { Tabs, Spin , Modal } from 'antd';
import { UPLOAD } from '../../../../config';

const { confirm } = Modal;

const AdminProducts =({user})=>{
  const { TabPane } = Tabs;

 
   
    const [productlist,setProductlist]=useState([])
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [categorylist,setCategorylist]=useState([])
    useEffect(() => {
       
        loadCategories()
       
     }, [])
     useEffect(() => {
       
      categorylist && categorylist[0]&& loadProducts(categorylist[0].ID)
   }, [ categorylist])

     const handleSearchChange = e => {
        e.preventDefault()
        setKeyword(e.target.value.toLowerCase())
       
      }
    if (!user.isAuthenticated ){
        
        return <Redirect to="/" />
    }   
    const loadProducts=async (catID)=>{
      const p= await getProducts(catID);
      setProductlist(p)
  
    }
    const loadCategories=async()=>{
     
        setCategorylist(await getCategories()) 
    
    }
   const handleRemove= async (ID,catID)=>{
    confirm({
      title: 'Do you want to delete these items?',
     
      content: 'When clicked the OK button, this will  delete the product and all the data',
      onOk() {
       try{
         setLoading(true)
          removeProduct(ID,user.token)
          loadProducts(catID)
      setLoading(false)
       }
       catch{
         
       }
        },
      onCancel() {},
    });
  
   
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
      <>
              <h4 className='topTitle'> Product's Dashboard</h4>
              <hr />
            <input type="search" placeholder="Search" value={keyword} onChange={handleSearchChange} className="form-control mb-4" />
           <div className='row'>

           <Tabs type="card" onChange={key=>loadProducts(key)}>
             
           {categorylist&& categorylist.map((c,index) => {
           return <TabPane tab={c.Name} key={c.ID} >
                  <div className='row'>
                  
                 { productlist&& productlist.map((p,index) => {
                    return (
                     

                    <div  key ={p.ID} className="col-md-3 ">
                        <div className="card  " >
                            <img className="card-img-top" src={`${UPLOAD}${p.Filename}`} alt=""/>
                        <div className="card-body">
                        <Link to={`../product/${p.ID}`}>
                        <h5 className="card-title" style={{"color":"#369cff"," textDecoration": "underline","TEXTTRANSFORM": "capitalize"}}>{p.Title}</h5>
                        </Link>
                        <Link to={`/admindashboard/products/edit/${p.ID}`}>
                            <span className="btn crudsbtn  btn-sm "  >
                                <i className="far fa-edit"></i>
                            </span>
                        </Link>
                            <span className='btn crudsbtn btn-sm ' onClick={e=>handleRemove(p.ID,c.ID)} >
                                    <i className="far fa-trash-alt"></i>
                      </span>
                        </div>
                  </div>
                </div>
                
        )})}
        {productlist.length==0 && <h2 style={{margin:"auto"}}>No Products In this Category </h2>}
        </div>
            </TabPane>
     
    })}
    </Tabs>
              </div>
             </>
           }     
           </div>
          </div>
        </div>
      )
}

const mapStateToProps = (state) => ({

  user: state.user
})
export default connect(mapStateToProps,null)(AdminProducts);

