/**
* Authentication actions
* author: @patr
*/

import types from '../config/action-types';
// import fetch from 'isomorphic-fetch';
// import API from '../config/api';
import Helpers from './helpers';

module.exports = {
    // TODO: Write real actions
    chooseActive: function chooseActive(active) {
        return dispatch => {
            return dispatch({
                type: types.CHOOSE_FILE,
                file: active.file,
                title: active.title,
            });
        }
    }
}