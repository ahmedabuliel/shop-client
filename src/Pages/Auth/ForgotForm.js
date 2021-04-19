import React ,{useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import {forget} from '../../actions/user'
import { Spin } from 'antd';
const  ForgotForm= ()=> {
 
   const [loading,setLoading]=useState(false)
    const [email, setEmail]=useState('')

    const onChange = (e) => {
        setEmail(e.target.value)
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        await forget(email)
        setLoading(false)
    }

 
    
    return (
        <div className="container p-5 col-10">
        <h2 className="topTitle mx-auto">Forget  Password</h2>
        {loading ? 
                 <h4 className="text-danger"><Spin/></h4>
                 :
        <form className="login col-6"   onSubmit={handleSubmit}> 
         
            <div className="form-group row">
                <label  className="col-3 col-form-label"> Email</label>
                <div className="col-sm-10">
                    <input type="email"  onChange={e=> onChange(e)} value={email} className="form-control col-12" placeholder="Email" name='email'    required/>
                </div>
            </div>
            
            <div className="form-group row">
            
                <div className="col-md-6 mx-auto">  
                        <button type='submit'  className="btn btn-danger" >Send Email</button>
                </div>
            </div>
            
           
            <div className='row'>    
            <Link to={{pathname: "/LoginForm"}} className='col-md-6 mx-auto'>
              Log In
            </Link>
            
            <Link to={{pathname: "/RegisterForm"}} className='col-md-6 mx-auto'>
               Register new user
            </Link>
            </div>
    </form>}
  </div>

    );
    
    
}

export default ForgotForm;
