import * as actionTypes from '../../../constants/action-types';

export const saveRestaurantDetails = (payload) => {
    return { type: actionTypes.SAVE_RESTAURANT_DETAILS, payload }
};

export const changeMode = (payload) => {
    return { type: actionTypes.CHANGE_MODE, payload }
};

export const enableSave = (payload) => {
    return { type: actionTypes.ENABLE_SAVE, payload }
};


