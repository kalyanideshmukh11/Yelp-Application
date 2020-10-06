
import * as actionTypes from '../../../constants/action-types';


const initialState = {
    restaurantDetails: null,
    mode: false,
    save: false,
    isChecked:false
}
 
const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SAVE_RESTAURANT_DETAILS:  
            return {
                ...state,
                restaurantDetails: action.payload
            }
        case actionTypes.CHANGE_MODE:
            return {
                ...state,
                mode: action.payload
            }
        case actionTypes.ENABLE_SAVE:
            return {
                ...state,
                save: action.payload
            }
        default:
            return initialState;
    }
}

export default orderReducer;