import React, {useState} from 'react'
import { toast } from 'react-toastify';
import {connect} from 'react-redux'
import {signup} from '../../actions/user'

import { Link, Redirect } from 'react-router-dom';

const RegisterForm=({signup,isAuthenticated})=> {
   
    const [values, setValues]=useState({
        name:'',
        email:'',
        password:'',
        confipassword:'',
        phone:'',
        formData: new FormData(),

    })
    const [imgFile,setImgFile]=useState();
    const [valid,setValid]=useState(false)

    
    const {name,email,password,confipassword,phone,formData} = values;
   
    if (isAuthenticated){
        
        return <Redirect to="/" />
    }
    
   const validator =(input)=>{
    //validate form 
        const number= input.phone.match(/^\d+$/)  
        const valiemail=input.email.match(/.+\@.+\..+/gm)
        const string = input.name.match(/^[a-zA-Z]{1,}(?: [a-zA-Z]+){0,2}$/gm)
        const valipassword=input.password.match(/\d/)
        if( !string ){
           
        toast.error("Name must contain a letters") 
        return setValid(false)
        }
        if(input.name.length<3)  {
            
            toast.error("Name must contain at least 3 letters") 
          return   setValid(false)
           
        }
        if(!valiemail){
         
        toast.error("Email must contain @ (example@example.com) !")  
        return setValid(false)
       
        }

       if(!number){
       
            toast.error("Phone must contain just number!")
           return setValid(false)
           
        }
        if(input.phone.length<9 ) {
       
            toast.error("phone must contain just 10 digits!")
           return setValid(false)
           
        }
        if(input.password.length<6)
        {  
            toast.error("password must be minmum 6")
            return  setValid(false)
           
        }
        if (input.password !== input.confipassword){
                toast.error("password not match!")
              
                return  setValid(false)
                
            }
      
            if(!valipassword)
            { 
                toast.error("password must contain number")
               return setValid(false)
                
            }
            return setValid(true)
        
    
    
  
}
    const onChange = (e) => {
        
        if(e.target.name=='imgFile')   {
          setImgFile(e.target.files[0])  
          formData.set(e.target.name, e.target.files[0])
        } else {
          formData.set(e.target.name, e.target.value)
          setValues({...values, [e.target.name]:e.target.value})}

    }
    const onSubmit = async(e) => {
        e.preventDefault();
        validator(values)
        if(valid)
       { 
        
       await signup(formData)
        }
       
    }

    
  return(
    <div className="container p-5 col-10">
      <h2 className="topTitle mx-auto">Register</h2>
    <form className="register login needs-validation" onSubmit={onSubmit}>
      
        <div className='row'>
          <div className="col-md-6">
            <label>Name*: </label>
            <input type='text' name='name' className="form-control col-12" value={name} onChange={e=> onChange(e)}  required />
           
          </div>
          <div className="col-md-6">
              <label>Email*:</label>
              <input className="form-control col-12" type='email' name='email' value={email} onChange={e=> onChange(e)} required />
            
          </div>
        </div>
        
       
        <div className='row'>
           
          <div className="col-md-6">
              <label>Password*</label>
              <input type='password' name='password' value={password} onChange={e=> onChange(e)} className="form-control col-12" required/>
             
          </div>
          <div className="col-md-6">
              <label>Confirm Password*</label>
              <input type='password' name='confipassword' className="form-control col-12"  value={confipassword} onChange={e=> onChange(e)} required/>
              
          </div>
        </div>
        <div className='row'>

            <div className="col-md-6">
              <label>Phone* :</label>
              <input type='text' name='phone'  className="form-control col-12" value={phone} onChange={e=> onChange(e)} required />
             
            </div>
           
            <div className="col-md-6">
                <label >Choose Profile Image</label>  
                <input type="file" className=" form-control col-12" name='imgFile'   onChange={ e => onChange(e)}  accept="image/*"/>
            </div>
        </div>
        <div className='row'>
            <div className="col-md-6 mx-auto">
                <button type='submit'  className="btn btn-danger" >Submit</button>
            </div>
        </div>
        <div className='row'>    
          
            
            <Link to="/LoginForm" className='col-md-6 mx-auto'>
              Log In
            </Link>
         </div>
        
        
    </form>
  
  </div>)
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated
})
 
export default connect(mapStateToProps,{signup})(RegisterForm);