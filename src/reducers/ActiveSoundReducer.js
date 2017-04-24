/**
* nando
* Active Sound reducer
* author: @patr
*/

import types from '../config/action-types';

const initialState = {
    files: [],
    folders: [],
    activeFolder: '',
    activeFile: 'https://mixergy.com/wp-content/audio/Mixergy-WhiteLabelDating-Ross-Williams.mp3',
    title: '',
}

module.exports = function ActiveSoundReducer(state = initialState, action) {
    switch (action.type) {
        case types.ACTIVE_FOLDER:
        case types.ALL_FOLDERS:
        case types.CHOOSE_FILE:
        case types.FILES_LIST:
        case types.GET_FILES:
        return {
            ...state,
            ...action,
        }

        default:
        return state;
    }
}