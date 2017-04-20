/**
* nando
* User reducer
* author: @patr
*/

import types from '../config/action-types';

const initialState = {
    user: {
        accessToken: ''
    }
}

module.exports = function UserReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN:
        return {
            ...state,
            ...action,
        }

        default:
        return state;
    }
}