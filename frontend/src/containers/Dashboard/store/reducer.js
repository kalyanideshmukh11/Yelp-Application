import * as actionTypes from '../../../constants/action-types';

const initialState = {
    restaurants: [],
    searchResults: [],
    openModal: false,
    //resume: "",
    success: false
}
 
const seachReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SAVE_RESTAURANTS:
            return {
                ...state,
                restaurants: action.payload,                
            }
        case actionTypes.RETURN_RESTAURANTS:
            return {
                ...state,
                searchResults: action.payload,                
            }
        case actionTypes.CONTROL_MODAL:
            return {
                ...state,
                openModal: action.payload,                
            }
        case actionTypes.SAVE_RESUME:
            return {
                ...state,
                resume: action.payload,                
            }
        case actionTypes.APPLY_TO_JOB:
            return {
                ...state,
                success: action.payload,                
            }
        default:
            return initialState;
    }
}

export default seachReducer;