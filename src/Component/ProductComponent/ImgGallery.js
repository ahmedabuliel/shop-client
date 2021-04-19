import React,{useEffect,useState} from 'react'
import ImageConatiner from "./ImageConatiner";
import ImageThump from './ImageThump';
const ImageGallery=(props)=>{
  
 

   
/* displaying the selected image if there more one image they displaying in thumbnil mode */
    return (
        <div className="container">
            
        <ImageConatiner imageUrl={props.imageUrl}/>
         
         <div className='row col-md-12'>

            {
            (props.images.length>1)? 
                        props.images.map((image,index)=>{
                
                       return <ImageThump key={image.ID} image={image} changeUrl={props.changeUrl} />

                     })
                    :null
            }
       
         </div>
       </div>
    )
}

export default ImageGallery;