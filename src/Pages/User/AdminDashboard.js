import React ,{useState} from 'react';
import NavBarSideAdmin from '../../Component/Navs/NavBarSideAdmin'
import {Redirect, Route, Switch,useHistory} from 'react-router-dom'
import{connect } from 'react-redux' 
import ProfileForm from './ProfileForm'

const AdminDashboard =({isAuthenticated,user})=>{
    let history = useHistory();
    if(isAuthenticated!=true ) { history.push("/") }
    return (<>
    
   
    <div className="container-fluid" >
        <div className='row'>
         <div className='col-md-2'>
         <NavBarSideAdmin/> 
         </div>
        <div className='col-md-8'>
                <h1>Admin dashboard</h1>
        </div>
        </div>
    </div>
   
    </>)
}
const mapStateToProps = (state) => ({
    user: state.user,
    isAuthenticated:state.user.isAuthenticated
})
export default connect(mapStateToProps, null)(AdminDashboard)

