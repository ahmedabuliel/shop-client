import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import NavBarSideAdmin from '../../../Component/Navs/NavBarSideAdmin'
import { Link, Redirect } from 'react-router-dom';
import {setCategory,getCategories,removeCategory} from '../../../actions/categories'
import { Spin } from 'antd';



const AdminCategory =({user})=>{
    const [name, setName] = useState("");
    const [categorylist,setCategorylist]=useState([])
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        loadCategories() 
       
    }, [loading])
    useEffect(() => {
        loadCategories() 
    },[])
    const loadCategories=async()=>{
     
        setCategorylist(await getCategories()) 
    
    }
  
    if (!user.isAuthenticated ){
        
        return <Redirect to="/" />
    }
    const handleSearchChange = e => {
        e.preventDefault()
        setKeyword(e.target.value.toLowerCase())
       
      }
      const handleSubmit =async (e) => {
        e.preventDefault()
        setLoading(true);
      await setCategory(name,user.token)
     loadCategories();
     setCategorylist(getCategories()) 
      setLoading(false);
      }
      const handleRemove=async (name,catId)=>{
        if (window.confirm(`To Delete ${name}?`)) {
          setLoading(true);
          await removeCategory(name,catId,user.token)
          loadCategories();
          setLoading(false);
        }
      }
    
    const categoryForm = () => (
        <form  onSubmit={handleSubmit} >
        <div className="form-group">
          <label>Add Category</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoFocus
            required
          />
          <br />
          <button className="btn btn-outline-primary">Save</button>
        </div>
      </form>
      )
    
    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              < NavBarSideAdmin />
            </div>
            <div className="col">
            {loading ? ( 
                 <h4 className="text-danger"><Spin/></h4>
                ) :
        <>
                <h4 className='topTitle'>Create category</h4>
              
    
              {categoryForm()}
            <hr />
            <input type="search" placeholder="Search" value={keyword} onChange={handleSearchChange} className="form-control mb-4" />
           <div className='row'>
            {categorylist&& categorylist.filter(c => c.Name.toLowerCase().includes(keyword)).map((c,index) => (
                <div  key ={c.ID} className="col-md-3  ">
                <div className="card  " >
                    <div className="card-body">
                    <h5 className="card-title">{c.Name}</h5>
                   
                    <Link to={`/admin/category/${c.ID}`}>
                    <span className="btn crudsbtn  btn-sm "  >
                             <i className="far fa-edit"></i>
                        </span>
                        </Link>
                     <span className='btn crudsbtn btn-sm ' onClick={()=>handleRemove(c.Name,c.ID)} >
                            <i className="far fa-trash-alt"></i>
                      </span>
                    </div>
              </div>
              </div>
                ))}
                </div>
            
        </>
     }     </div>
          </div>
        </div>
      );
}

const mapStateToProps = (state) => ({

  user: state.user
})
export default connect(mapStateToProps,null)(AdminCategory);

