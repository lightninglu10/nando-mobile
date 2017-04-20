import DeviceInfo from 'react-native-device-info';

/**
* nando
* Ok so this is the place where we declare global constants
* author: @patr
*/

/* global Symbol */

/**
* Enum declaring all the possible development environments.
*/
export const ENVIRONMENT_TYPE = {
  LOCAL: Symbol('LOCAL'),
  DEVELOPMENT: Symbol('DEVELOPMENT'),
  STAGING: Symbol('STAGING'),
  PRODUCTION: Symbol('PRODUCTION'),
};

/**
* Enum declaring all the possible app identifiers.
*/
// TODO get this right
export const APP_IDENTIFIER_TYPE = {
  LOCAL: 'org.reactjs.native.example.nando',
  DEVELOPMENT: 'org.reactjs.native.example.nando',
  STAGING: 'co.thehobby.amplifi-stag',
  PRODUCTION: 'co.thehobby.amplify',
};

/**
* If set to true the app displays more information on the screen
* Only use this in development module
*/
export const VERBOSE = false;

/**
* JS bundle version number
*/
export const BUNDLE_VERSION = '01';

// ****   ------------------------------------------  ****  //

let _environment = '';
switch (DeviceInfo.getBundleId()) {
  case APP_IDENTIFIER_TYPE.LOCAL:
    _environment = ENVIRONMENT_TYPE.LOCAL;
    break;
  case APP_IDENTIFIER_TYPE.DEVELOPMENT:
    _environment = ENVIRONMENT_TYPE.DEVELOPMENT;
    break;
  case APP_IDENTIFIER_TYPE.STAGING:
    _environment = ENVIRONMENT_TYPE.STAGING;
    break;
  case APP_IDENTIFIER_TYPE.PRODUCTION:
    _environment = ENVIRONMENT_TYPE.PRODUCTION;
    break;
  default:
    _environment = ENVIRONMENT_TYPE.PRODUCTION;
    break;
}
/**
* The current development environment. (The backend environment to use)
* Change your xcode target to change this environment
*/
export const ENVIRONMENT = _environment;

/**
* Are we currenlty in production environment
*/
export const IS_PRODUCTION = false;

/**
* UI parameters
*/
export const HOME_GRID_SPACING = 8;

/**
* Google Client ID
*/

export const IOS_GOOGLE_CLIENT_ID = '911088567565-l2la7fvbd4fpaih15318tke5c5ig6qc0.apps.googleusercontent.com';

