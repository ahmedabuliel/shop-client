import React ,{useState,useEffect}from 'react';
import { getSearchProducts} from '../../actions/products'
import {Link} from 'react-router-dom';
import { UPLOAD } from '../../config'
const Search =(props)=>{
    const [search,setSearch]=useState('')
   const [display,setdisplay] =useState('none')
   const [searchProduct,setSearchProduct] = useState([])
    const [currentPath,setCurrentPath]=useState(props.history.location.pathname)
    const pathChange=()=>{
      setSearch('')
            setdisplay('none')
            setSearchProduct([])
        
    }
   
    const onChange=async (e)=>{
       setSearch(e.target.value);
  
       if(e.target.value.length>=3){
           setdisplay('inline-block')
           setSearchProduct(await getSearchProducts(e.target.value));
          
       }
       else{
        setdisplay('none')
        setSearchProduct([])
    }
   } 

 useEffect(() => {
   
    pathChange()
   
 },[props.history.location.pathname])
   return (
        <form className="form-inline my-2 my-lg-0" >
        <input className="form-control mr-sm-2" 
        type="search" name='search' 
        placeholder="Search"
        value={search}
        onChange={e=> onChange(e)}/>
       
      <div className='searchresult card' style={{display:display}}>
        {searchProduct && <ul>
            <h4>Search Result</h4>
            {searchProduct.map((product)=>{
               if(product.cover==1)
               return(  
               <Link  exact to={`/product/${product.ID}`} >
                    <li >
                        <img className='imgSearch' src={`${UPLOAD}${product.Filename}`}/>
                        <span>{product.Title}</span>
                        <span style={{color:'red',marginLeft:'5%'}}>{ product.Price}₪</span>
                        <hr/>
                        </li>
                  
                </Link>
                )
            })
               }
            </ul>}
      </div>
      </form>

    )
}
export default Search