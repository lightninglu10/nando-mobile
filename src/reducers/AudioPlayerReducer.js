/**
* Audio Player reducer
* author: @patr
*/

import types from '../config/action-types';

const initialState = {
    show: false,
}

module.exports = function AudioPlayerReducer(state = initialState, action) {
    switch (action.type) {
        case types.SHOW_AUDIOPLAYER:
        return {
            ...state,
            ...action,
        }

        default:
        return state;
    }
}