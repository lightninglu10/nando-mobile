/**
* nando
* Active Sound reducer
* author: @patr
*/

import types from '../config/action-types';

const initialState = {
    file: 'https://mixergy.com/wp-content/audio/Mixergy-WhiteLabelDating-Ross-Williams.mp3',
    title: '',
}

module.exports = function ActiveSoundReducer(state = initialState, action) {
    switch (action.type) {
        case types.CHOOSE_FILE:
        return {
            ...state,
            ...action,
        }

        default:
        return state;
    }
}