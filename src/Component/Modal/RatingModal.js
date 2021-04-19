import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner,Modal,Button } from "react-bootstrap";
import {setRating,getRating} from '../../actions/rating' 
import StarRating from 'react-star-ratings';
const RatingModal =({props,user})=> {
    const [modalVisible, setModalVisible] = useState(false);
    const [star,setStar]=useState(0)

    
    const handleModal = () => {
        if (user && user.token) {
          setModalVisible(true);
          setStar(props.star)
        }
    }
    const submitRating=async e=>{
        await setRating(props.productID,user.token,star)
        setModalVisible(false);
        props.rating(await getRating(props.productID))
        toast.success('Thank You for leaving rating ')
    }
    const changeRating=(newstar)=>{
       
        setStar(newstar)

    }
   
   
    return (<>
        <div  onClick={handleModal}> 
        
         <i className="far fa-star"></i>
         </div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalVisible}
        onHide={() => setModalVisible(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          Leave your rating
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {star !=undefined&& 
        <StarRating
                
                numberOfStars={5}
                rating={star}
                changeRating={rating =>changeRating(rating)}
                isSelectable={true}
                starRatedColor="red"
              />
     }
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={e=>submitRating(e)} >Save</Button>
       
        </Modal.Footer>
      </Modal>
     </>
    );
  }
  const mapStateToProps = (state,ownProps) => {
    return {
        props:ownProps,
        user:state.user,
       
    
    } 
    }
    
     export default connect(mapStateToProps,null)(RatingModal);