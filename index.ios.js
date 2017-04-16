/**
* nando
* iOS entrypoint
* author: @patr
*/

'use strict';

import GoogleAnalytics from 'react-native-google-analytics-bridge';
// GoogleAnalytics.setTrackerId('UA-76830287-2');

import { AppRegistry } from 'react-native';
import Root from './src/containers/Root';

const App = new Root();

AppRegistry.registerComponent('nando', () => Root);
