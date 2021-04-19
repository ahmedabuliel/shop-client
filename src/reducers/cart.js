import { GET_CART } from '../actions/types';
const initialState=[]
export const cart= (state=initialState,action) => {
   
    switch (action.type){
    case  GET_CART:
        return action.payload;
  
        default:
            return state;
    }
}
