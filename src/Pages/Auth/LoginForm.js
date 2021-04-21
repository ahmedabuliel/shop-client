import React ,{useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import {signin} from '../../actions/user'
import{connect} from 'react-redux'
const  LoginForm= ({signin,isAuthenticated,history})=> {
 
   
    const [values, setValues]=useState({
        email:'',
        password:''

    })

    const {email,password} = values;
   
    let intended = history.location.state;
  
    if (isAuthenticated){
        if(intended)
        history.push(intended);
        else
        return <Redirect to="/" />
    }

    const onChange = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        await signin(values)
        
    }

 
    
    return (
        <div className="container p-5 col-10">
        <h2 className="topTitle mx-auto">Log In </h2>
        <form className="login col-md-6"   onSubmit={handleSubmit}> 
           
            <div className="form-group row">
                <label  className="col-3 col-form-label"> Email</label>
                <div className="col-sm-10">
                    <input type="email"  onChange={e=> onChange(e)} value={email} className="form-control col-12" placeholder="Email" name='email'    required/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="password"  onChange={e=> onChange(e)} className="col-3 col-form-label"> Password</label>
                <div className="col-sm-10">
                    <input  type="password"  onChange={e=> onChange(e)} value={password} className="form-control col-12" placeholder="Password"  name="password"  required/>
                </div>
            </div>
            <div className="form-group row">
            
                <div className="col-md-6 mx-auto">  
                        <button type='submit'  className="btn btn-danger" >Log In</button>
                </div>
            </div>
            
           
            <div className='row'>    
            <Link to={{pathname: "/ForgotForm"}} className='col-md-6 mx-auto'>
               Forget Password
            </Link>
            
            <Link to={{pathname: "/RegisterForm"}} className='col-md-6 mx-auto'>
               Register new user
            </Link>
            </div>
  </form>
  </div>

    );
    
    
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated
})
export default connect(mapStateToProps, {signin})(LoginForm);
