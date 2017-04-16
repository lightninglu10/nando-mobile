/**
* AMPLI.FI
* Place where we create the store and combine it with the reducers (Redux stuff)
* author: @bnolens
*/

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import DeviceInfo from 'react-native-device-info';
import { IS_PRODUCTION } from './settings';

const rootReducer = require('../reducers');
let createStoreWithMiddleware;

// Middleware for development mode
if(!IS_PRODUCTION) {
  // Configure the logger middleware
  const logger = createLogger({
    level: 'info', // 'log' | 'console' | 'warn' | 'error' | 'info'
    collapsed: true,
    duration: true,
  });

  createStoreWithMiddleware = compose(applyMiddleware(thunk, logger)(createStore));

// Middleware for production mode
} else {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunk)(createStore)
  );
}

module.exports = function configure(initialState) {
  // Create the redux store and add middleware to it
  const store = createStoreWithMiddleware(rootReducer, initialState);

  // Snippet to allow hot reload to work with reducers
  if(!IS_PRODUCTION && module.hot) {
    module.hot.accept(() => store.replaceReducer(rootReducer));
  }
  return store;
};