import React,{useEffect,useState} from 'react'
import {UPLOAD} from '../../config'
const ImageThump =(props) =>{
  
  
  
    return (
    <button className='btn-img' onClick={()=>{props.changeUrl(props.image.Filename)}}>
            <div className='col-md' >
                <img src= {`${UPLOAD}${props.image.Filename}`} className="img-thumbnail" alt="..."/>
                </div>
        </button>
      

    )
}

export default ImageThump;