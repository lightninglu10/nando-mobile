/* @flow */

import React from "react";
import {
    View,
} from 'react-native';

import { Provider } from 'react-redux';
import configureStore from "../config/configure-store";
import Routes from "./Routes";

import AudioPlayerContainer from './AudioPlayerContainer';

const store = configureStore();

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
            <Routes />
            <AudioPlayerContainer />
        </View>
      </Provider>
    );
  }
}

export default Root;