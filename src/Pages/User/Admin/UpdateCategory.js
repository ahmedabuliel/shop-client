import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import NavBarSideAdmin from '../../../Component/Navs/NavBarSideAdmin'
import {getCategory,updateCategory,getCategories} from '../../../actions/categories'
import { Link, Redirect } from 'react-router-dom';



const UpdateCategory =({ history, match , user,getCategories})=>{
    const [loading, setLoading] = useState(false);
  
    const [name, setName] = useState("");
 const loadCategory=async()=>{
    let c =await getCategory(match.params.catId)
    setName (c.Name)
   }
   const handleSubmit = async e=>{
    
    e.preventDefault();
            setLoading(true);
           await updateCategory(name,match.params.catId,user.token)
             setLoading(false)
           
          history.push(`/admindashboard/category`)
       
   } 
   useEffect(() => {
       loadCategory()
      
   }, [])
    return(
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              < NavBarSideAdmin />
            </div>
           
            <div className="col">
            {loading ? ( 
                 <h4 className="text-danger">Loading..</h4>
                ) :
        <>
                <h4 className='topTitle'>Category</h4>
                <form  onSubmit={handleSubmit} >
                <div className="form-group">
                     <label>Edit Category</label>
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
             
            
        </>
     }     </div>
          </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
  
    user: state.user
  })
  export default connect(mapStateToProps,{getCategories})(UpdateCategory);
  