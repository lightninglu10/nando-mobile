/**
* Active sound actions
* author: @patr
*/

import types from '../config/action-types';
// import fetch from 'isomorphic-fetch';
import API from '../config/api';
import Helpers from './helpers';

module.exports = {
    show: function show(show) {
        return dispatch => {
            return dispatch({
                type: types.SHOW_AUDIOPLAYER,
                show: show,
            });
        }
    } 
}