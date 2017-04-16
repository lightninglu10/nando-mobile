import React, { NetInfo, AppState, Linking } from 'react-native';
import { Provider } from 'react-redux';
import Orientation from 'react-native-orientation';
import { Navigation } from 'react-native-navigation';

import AppActions from '../actions/app';
import UpdateController from '../controllers/update-controller';

import configureStore from '../config/configure-store';
import screens from '../config/screen-types';
import Colors from '../config/colors';

const store = configureStore();

// Screen related book keeping
import { registerScreens } from './';
registerScreens(store, Provider);

export default class App {
  constructor() {
    // since react-redux only works on components, we need to subscribe this class manually
    store.subscribe(this.onStoreUpdate.bind(this));

    this.initialize();

    this.addObservers();

    // Listen and handles connection changes
    this.handleConnectionChange();
  }

  initialize() {
    if (!this.isInitializing && !this.isInitiated) {
      this.isInitiated = false;
      this.isInitializing = true;

      this.updateController = new UpdateController(store.dispatch);

      // Check if logged in. If so fetch my user data.
    }
  }

  // Happens when the device's internet connection changes (on<->off)
  handleConnectionChange() {
    const { dispatch } = store;
    const handleConnectionChange = (isConnected) => {
      if (!isConnected) {
        dispatch(AppActions.showError('You need an internet connection to use this app.'));
      }
      dispatch(AppActions.connected(isConnected));
    };
    const handleConnectionTypeChange = (netInfo) => {
      dispatch(AppActions.netInfoType(netInfo));
    };
    // NetInfo.isConnected.fetch().done(handleConnectionChange);
    NetInfo.isConnected.addEventListener('change', handleConnectionChange);
    NetInfo.fetch().done(handleConnectionTypeChange);
    NetInfo.addEventListener('change', handleConnectionTypeChange);
  }

  lockOrientation(orientation) {
    switch(orientation) {
      case 'PORTRAIT':
        Orientation.lockToPortrait();
        break;

      case 'LANDSCAPE':
        Orientation.lockToLandscape();
        break;

      case 'PORTRAITUPSIDEDOWN':
        Orientation.lockToPortrait();
        break;

      case '':
        Orientation.unlockAllOrientations();
        break;

      default:
        break;
    }
  }

  onNetInfoChange(netInfo) {
    if (!this.isInitiated && netInfo.isConnected) {
      this.initialize();
    }
  }
}