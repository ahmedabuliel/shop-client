import { SET_FILTER } from '../actions/types';
const initialState=[]
export const filter= (state=initialState,action) => {
   
    switch (action.type){
    case  SET_FILTER:
        return action.payload;
  
        default:
            return state;
    }
}
