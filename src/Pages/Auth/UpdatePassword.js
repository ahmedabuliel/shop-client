import React ,{useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { updatePassword} from '../../actions/user'
import { Spin } from 'antd';
import { toast } from 'react-toastify';
import store from '../../store'
const  ForgotForm= ({match,history})=> {
    const token = match.params.token; 
   const [loading,setLoading]=useState(false)
   const [values, setValues]=useState({ password:'',
   confipassword:'', })
   const {password,confipassword} = values;
    console.log(token)
    const onChange = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }


    const handleSubmit = async(e) => {
        e.preventDefault();
        const valipassword=password.match(/\d/)
      
        if(valipassword){
                if(password.length>=6){
                   
                            if(password==confipassword){
                        setLoading(true)
                        await    store.dispatch(updatePassword(password,token))
                        history.push('/')
                        setLoading(false)
                            }
                            else  {toast.error("passwords not match") 
                             setLoading(false)}
                }
            else   { toast.error("password must be minmum 6")  
            setLoading(false)}
        }  
        else 
        {
            toast.error("password must contain number")  
            setLoading(false)
        }
    }

 
    
    return (
        <div className="container p-5 col-10">
        <h2 className="topTitle mx-auto">Forget  Password</h2>
        {loading ? 
                 <h4 className="text-danger"><Spin/></h4>
                 :
        <form className="login col-6"   onSubmit={handleSubmit}> 
         
            <div className="form-group row">
                <label  className="col-3 col-form-label"> Password</label>
                <div className="col-sm-10">
                    <input type="password"  onChange={e=> onChange(e)} value={password}
                     className="form-control col-12" placeholder="Password" name='password'    required/>
                </div>
            </div>
            <div className="form-group row">
                <label  className="col-3 col-form-label"> Confirm Password</label>
                <div className="col-sm-10">
                    <input type="password"  onChange={e=> onChange(e)} value={confipassword}
                     className="form-control col-12" placeholder="confirm password" name='confipassword'    required/>
                </div>
            </div>
            
            <div className="form-group row">
            
                <div className="col-md-6 mx-auto">  
                        <button type='submit'  className="btn btn-danger" >Save</button>
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
