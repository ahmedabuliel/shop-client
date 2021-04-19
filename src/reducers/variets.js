import { GET_VARIETS } from '../actions/types';
const initialState={}

export const variets= (state=initialState,action) => {
   
    switch (action.type){
    case GET_VARIETS:
        return [
           ... action.payload ];
  
        default:
            return state;
    }
}
