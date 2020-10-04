
import * as actionTypes from '../../../constants/action-types';


const initialState = {
    eventDetails: null,
    eventmode: false,
    save: false,
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
        default:
            return initialState;
    }
}

export default eventReducer;