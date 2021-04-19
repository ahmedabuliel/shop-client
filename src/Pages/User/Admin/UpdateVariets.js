import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import NavBarSideAdmin from '../../../Component/Navs/NavBarSideAdmin'
import {getVariet,updateVariets, getVariets} from '../../../actions/variets'
import { Link, Redirect } from 'react-router-dom';



const UpdateVariets =({ history, match , user, getVariets})=>{
    const [loading, setLoading] = useState(false);
    const [saved,setSaved]=useState(false)
   

    const [variet,setVariet]=useState(getVariet(match.params.variId))
    const [values, setValues]=useState({title:variet.title,value:variet.value,chk:variet.chk})
    
     const {title,value}=values
     const handleChange =e =>{
        setValues({...values, [e.target.name]:e.target.value})
         }
         const handleClick =e =>{
            setValues({...values, [e.target.name]:e.target.checked})
        }

  
     const handleSubmit = async e=>{
        e.preventDefault();
        setLoading(true);
       await updateVariets(title,value,match.params.variId,user.token)
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
              <h4 className='topTitle'> Update Variet</h4>
              <form  onSubmit={handleSubmit} >
                <div className="form-group">
                    <label>Edit {variet.title}</label>
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
                <div className="input-group mb-3">
                            <div className="input-group-prepend">
                             <div className="input-group-text">
                            
                                <input type="checkbox" name='chk' 
                                aria-label="Checkbox for following text input" 
                                onClick={(e) => handleClick(e)}
                                checked={values.chk}/>
                                <span className='px-1'>Color Variet</span>
                            </div>
                             </div>
                             {!values.chk &&<input
                            type="text"
                            className="form-control"
                            name='value'
                            onChange={(e) => handleChange(e)}
                            value={values.value}
                            autoFocus
                            required
                                />}
                            {
                                values.chk && <input
                                type="color"
                                className="form-control"
                                name='value'
                                onChange={(e) => handleChange(e)}
                                value={values.value}
                                autoFocus
                                required
                                    />}
                            
                        </div>
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
  export default connect(mapStateToProps,{getVariets})(UpdateVariets);
  