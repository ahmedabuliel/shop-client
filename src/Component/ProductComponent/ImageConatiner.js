import {UPLOAD} from '../../config'
const ImageConatiner = (url) => {
  
    return (
        <div className='row col-md-12 d-block'>
                <img src={`${UPLOAD}${url.imageUrl}`}/>
        </div>
    )
}

export default ImageConatiner