import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import NavBarSideAdmin from '../../../Component/Navs/NavBarSideAdmin'
import {getVariet,updateVarietTitle, getVariets} from '../../../actions/variets'
import {  Redirect } from 'react-router-dom';



const UpdateVarietsTitle =({ match , user, getVariets})=>{
    const [loading, setLoading] = useState(false);
    const [saved,setSaved]=useState(false)
   

    
    const [values, setValues]=useState({title:match.params.name})
    
     const {title}=values
     const handleChange =e =>{
        setValues({...values, [e.target.name]:e.target.value})
         }
        
  
     const handleSubmit = async e=>{
        e.preventDefault();
        setLoading(true);
       await updateVarietTitle(title,match.params.name,user.token)
        await  getVariets();
         setLoading(false)
     
        setSaved(true)
   
}   

    
    return(
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            < NavBarSideAdmin />
          </div>
          {saved && <Redirect to={`/admindashboard/variets`} />}
          <div className="col">
          {loading ? ( 
               <h4 className="text-danger">Loading..</h4>
              ) :
      <>
              <h4 className='topTitle'> Update Variet Name</h4>
            <form  onSubmit={handleSubmit} >
                <div className="form-group">
                    <label>Edit {match.params.name}</label>
                    <input
                        type="text"
                        className="form-control"
                        name='title'
                        onChange={(e) =>  handleChange(e)}
                     value={title}
                        autoFocus
                        required
                    />
                <br />
                    <button className="btn btn-outline-primary">Save</button>
                </div>
            </form>
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
  export default connect(mapStateToProps,{getVariets})(UpdateVarietsTitle);
  