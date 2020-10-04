import * as actionTypes from '../../../constants/action-types';

export const saveRestaurants = (payload) => {
    return { type: actionTypes.SAVE_RESTAURANTS, payload}
};

export const returnRestaurants = (payload) => {
    return { type: actionTypes.RETURN_RESTAURANTS, payload}
};

export const controlModal = (payload) => {
    return { type: actionTypes.CONTROL_MODAL, payload}
};

export const saveResume = (payload) => {
    return { type: actionTypes.SAVE_RESUME, payload }
};

export const applyToJob = (payload) => {
    return { type: actionTypes.APPLY_TO_JOB, payload }
};

// export const changeEdMode = (payload) => {
//     return { type: actionTypes.CHANGE_EDUCATION_MODE, payload }
// };

// export const changeExpMode = (payload) => {
//     return { type: actionTypes.CHANGE_EXPERIENCE_MODE, payload }
// };

// export const enableSave = (payload) => {
//     return { type: actionTypes.ENABLE_SAVE, payload }
// };

// export const saveProfilePic = (payload) => {
//     return { type: actionTypes.SAVE_PROFILE_PIC, payload }
// };