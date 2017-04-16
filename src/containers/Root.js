/* @flow */

import React from "react";
import { Provider } from 'react-redux';
import configureStore from "../config/configure-store";
import Routes from "./Routes";

const store = configureStore();

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default Root;