
import * as actionTypes from '../../../constants/action-types';


const initialState = {
    restaurantDetails: null,
    restaurantImages:null,
    menuDetails: null,
    mode: false,
    save: false,
    imagemode:false,
    menumode:false,
}
 
const placeOrderReducer = (state = initialState, action) => {
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
         case actionTypes.SAVE_RESTAURANT_IMAGES:  
            return {
                ...state,
                restaurantImages: action.payload
            }
         case actionTypes.CHANGE_IMAGE_MODE:
                return {
                    ...state,
                    imagemode: action.payload
                }
        case actionTypes.SAVE_MENU_DETAILS:  
                return {
                    ...state,
                    menuDetails: action.payload
                }
             case actionTypes.CHANGE_MENU_MODE:
                    return {
                        ...state,
                        menumode: action.payload
                    }
        default:
            return initialState;
    }
}

export default placeOrderReducer;