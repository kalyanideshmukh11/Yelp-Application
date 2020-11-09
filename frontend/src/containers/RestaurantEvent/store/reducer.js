
import * as actionTypes from '../../../constants/action-types';


const initialState = {
    eventDetails: null,
    eventmode: false,
    save: false,
    openModal: false,
    currentPage: 1
}
const eventReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SAVE_EVENT_DETAILS:  
            return {
                ...state,
                eventDetails: action.payload
            }
        case actionTypes.CHANGE_EVENT_MODE:
            return {
                ...state,
                eventmode: action.payload
            }
        case actionTypes.ENABLE_SAVE:
            return {
                ...state,
                save: action.payload
            }
        case actionTypes.CONTROL_MODAL:
            return {
                    ...state,
                    openModal: action.payload,                
                }
        case actionTypes.SET_CURRENT_RESTAURANT_EVENT_PAGE:
            return {
                     ...state,
                     currentPage: action.payload,                
                    }
        default:
            return initialState;
    }
}

export default eventReducer;