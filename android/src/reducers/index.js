
/**
* nando
* Combining all reducers
* author: @patr
*/

import { combineReducers } from 'redux';

module.exports = combineReducers({
    activeSound: require('./ActiveSoundReducer'),
});