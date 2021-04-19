import axios from 'axios'
import {API} from '../config'
import { GET_IMAGES ,SET_IMAGES_URL} from './types';
export const getImages= () => async dispatch => {
    try{
        const config={
            "Content-Type":"application/json"
        }
        const res= await axios.get(`${API}/getImages`,config)
       
        dispatch({
            type:GET_IMAGES,
            payload:res.data
        })

    } catch(err){
     
    }
}

