import React,{useEffect,useState} from 'react';
import StarRatings from 'react-star-ratings';

const RatingFilter=(props)=>{
   
    const handleChange=e=>{
       
        const p = e.target.value.split(",")
  const i= p.map(i=>{
            return parseInt(i)
        })
       props.setRatingFilter(i)
       
    }
    
    return (<>
    <div className="form-check">
        <input className="form-check-input" type="radio"  name="ratingRadioDefault"
         value={[0,0]}
        onChange={e=>handleChange(e)}/>
        <label className="form-check-label" >
        All The Rating's
        </label>
    </div>
    <div className="form-check">
        <input className="form-check-input" type="radio"  name="ratingRadioDefault"
         value={[0,1]}
        onChange={e=>handleChange(e)}/>
        <label className="form-check-label" >
        <StarRatings  starDimension="20px"
                    starSpacing="2px"
                    starRatedColor="red"
                    rating={0}
                    editing={false} />
        </label>
    </div>
    <div className="form-check">
        <input className="form-check-input" type="radio"  name="ratingRadioDefault"
         value={[1,2]}
        onChange={e=>handleChange(e)}/>
        <label className="form-check-label" >
        <StarRatings  starDimension="20px"
                    starSpacing="2px"
                    starRatedColor="red"
                    rating={1}
                    editing={false} />
        </label>
    </div>
    <div className="form-check">
        <input className="form-check-input" type="radio"  name="ratingRadioDefault"
        value={[2,3]}
        onChange={e=>handleChange(e)}/>
        <label className="form-check-label" >
        <StarRatings  starDimension="20px"
                    starSpacing="2px"
                    starRatedColor="red"
                    rating={2}
                    editing={false} />
        </label>
    </div>
    <div className="form-check">
        <input className="form-check-input" type="radio"  name="ratingRadioDefault"
        value={[3,4]}
        onChange={e=>handleChange(e)}/>
        <label className="form-check-label" >
        <StarRatings  starDimension="20px"
                    starSpacing="2px"
                    starRatedColor="red"
                    rating={3}
                    editing={false} />
        </label>
    </div>
    <div className="form-check">
        <input className="form-check-input" type="radio"  name="ratingRadioDefault"
        value={[4,5]}
        onChange={e=>handleChange(e)}/>
        <label className="form-check-label" >
        <StarRatings  starDimension="20px"
                    starSpacing="2px"
                    starRatedColor="red"
                    rating={4}
                    editing={false} />
        </label>
    </div>
    <div className="form-check">
        <input className="form-check-input" type="radio"  name="ratingRadioDefault"
        value={[5,6]}
        onChange={e=>handleChange(e)}/>
        <label className="form-check-label" >
        <StarRatings  starDimension="20px"
                    starSpacing="2px"
                    starRatedColor="red"
                    rating={5}
                    editing={false} />
        </label>
    </div>
    
    </>
    )
}
export default RatingFilter