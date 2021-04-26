import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import NavBarSideAdmin from '../../../Component/Navs/NavBarSideAdmin'
import { Link, Redirect } from 'react-router-dom';
import {getVariets,createVariet,removeVariet, removeVarietTitle} from '../../../actions/variets'
import {Tabs,Tab} from 'react-bootstrap'
import { Spin } from 'antd';


const AdminVariets =({user ,varietsList,getVariets})=>{
    const [variets,setVariets]=useState([])
    const [loading, setLoading] = useState(false);
    const [values, setValues]=useState({chk:false})
    const loadVariets=async()=>{
         setVariets(varietsList)
    }
    const handleChange =e =>{
        setValues({...values, [e.target.name]:e.target.value})
    }
    const handleClick =e =>{
        setValues({...values, [e.target.name]:e.target.checked})
    }
    const handleSubmit =async (e) => {
        e.preventDefault()
        setLoading(true);
      await  createVariet(values.title,values.value,values.chk,user.token)
      await getVariets()
      loadVariets();
      setLoading(false);
    }
    const handleRemoveVariet=async (title,value,variId)=>{
    
        if (window.confirm(`To Delete ${title}:${value}?`)) {
          setLoading(true);
          await removeVariet(title,value,variId,user.token)
          await getVariets()
          setLoading(false);
        }
      }
      const handleRemoveTitle=async (title)=>{
        if (window.confirm(`Are You Sure You Want to Delete ${title} this will Delete all the variets for this title? `)) {
            setLoading(true);
            await  removeVarietTitle(title,user.token)
            await getVariets()
             setLoading(false);
        }
      }
      const titleCruds=(vari)=>{
          return (<>
          {vari.title}
          <Link  to={`/admin/variets/title/${vari.title}`}>
          <span className="btn crudsbtn  btn-sm float-right"  >
              <i className="far fa-edit"></i>
          </span>
      </Link>
      <span className='btn crudsbtn btn-sm float-right'  onClick={(e)=> handleRemoveTitle(vari.title)} >
              <i className="far fa-trash-alt"></i>
      </span>
      </>
      )

      }
      const contentTab =(vari)=>{
      return vari.res.map((v)=>{
        return (           
            (v.chk)?
            <div  key ={v.ID} className="col-md-3 ">
                <div className="card w-50 " >
                    <div className="card-body">
                    <h5 className="card-title">{vari.title}</h5>
                    <p className="card-text" style={{background: `${v.value}`}}>{v.value}</p>
                    <Link to={`/admin/variets/${v.ID}`}>
                        <span className="btn crudsbtn  btn-sm "  >
                            <i className="far fa-edit"></i>
                        </span>
                    </Link>
                        <span className='btn crudsbtn btn-sm ' onClick={(e)=> handleRemoveVariet(vari.title,v.value,v.ID)} >
                                <i className="far fa-trash-alt"></i>
                   </span>
                    </div>
              </div>
              </div>
                     
                
            :             
            <div  key ={v.ID} className="col-3 ">
            <div className="card w-50 " >
                <div className="card-body">
                <h5 className="card-title">{vari.title}</h5>
                <p className="card-text" >{v.value}</p>
                <Link to={`/admin/variets/${v.ID}`}>
                    <span className="btn crudsbtn  btn-sm "  >
                        <i className="far fa-edit"></i>
                    </span>
                </Link>
                    <span className='btn crudsbtn btn-sm ' onClick={(e)=> handleRemoveVariet(vari.title,v.value,v.ID)} >
                            <i className="far fa-trash-alt"></i>
               </span>
                </div>
          </div>
          </div>
               
         )
        })
      }
    useEffect(() => {
        loadVariets()
        setVariets(varietsList)
    }, [loading])

    if (!user.isAuthenticated ){
        
        return <Redirect to="/" />
    }
    
 return (
    <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              < NavBarSideAdmin />
            </div>
            <div className="col-md-10">
            {loading ? ( 
                 <h4 className="text-danger"><Spin/></h4>
                ) :
                <>
                     <h4 className='topTitle'>Create Variets</h4>
                     <form   onSubmit={handleSubmit}>
                        <div className="form-group">
                        <label>Add Title Variet</label>
                        <input
                            type="text"
                            className="form-control"
                            name='title'
                            onChange={(e) => handleChange(e)}
                            value={values.title}
                            autoFocus
                            required
                        />
                        <br />
                        <label>Add Value Variet</label>
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
                    <Tabs defaultActiveKey={0} id="uncontrolled-tab-example">
                        
                   {
                   variets && 
                        variets.map((vari,index)=>
                        {
                          return <Tab  key={index} eventKey={index} title={ titleCruds(vari)} >
                        {   contentTab(vari)}
                        </Tab>
                        })
                    }
                              
                               
                          
                
                    </Tabs>
                </>}
            </div>
            </div>
    </div>
 )   
}

const mapStateToProps = (state) => ({
   varietsList:state.variets,
    user: state.user
  })
  export default connect(mapStateToProps,{ getVariets})(AdminVariets);


