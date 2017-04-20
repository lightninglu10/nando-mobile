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
    loggedIn: function loggedIn(user) {
        return dispatch => {
            return dispatch({
                type: types.LOGIN,
                user: user,
            });
        }
    }
}