/**
* Active sound actions
* author: @patr
*/

import types from '../config/action-types';
// import fetch from 'isomorphic-fetch';
import API from '../config/api';
import Helpers from './helpers';

// Settings
import { GOOGLE, IOS_GOOGLE_CLIENT_ID } from '../config/settings';

function allFolders(folders) {
    return {
        type: type.ALL_FOLDERS,
        folders: folders,
    }
}

function activeFolder(folderId) {
    return {
        type: types.ACTIVE_FOLDER,
        activeFolder: folderId,
    }
}

module.exports = {
    // configureDriveAPI: function configureDriveAPI() {
    //     // Client ID and API key from the Developer Console
    //     var CLIENT_ID = IOS_GOOGLE_CLIENT_ID;

    //     // Array of API discovery doc URLs for APIs used by the quickstart
    //     var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

    //     // Authorization scopes required by the API; multiple scopes can be
    //     // included, separated by spaces.
    //     var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

    //     return dispatch => {
    //         return new Promise((resolve, reject) => {
    //             gapi.client.init({
    //                 discoveryDocs: DISCOVERY_DOCS,
    //                 clientId: CLIENT_ID,
    //                 scope: SCOPES
    //             });
    //         });
    //     }
    // },

    getFolders: function getFolders(apiToken) {
        var get_config = API.GET_CONFIG;
        get_config.headers['Authorization'] = `Bearer ${apiToken}`;
        return dispatch => {
            return fetch(API.GOOGLE_DRIVE + API.FOLDER_URL, getconfig)
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                return dispatch(allFolders(json.files))
            });
        }
    },

    getFileList: function getFileList(apiToken, folderId) {
        var get_config = API.GET_CONFIG;
        get_config.headers['Authorization'] = `Bearer ${apiToken}`
        return dispatch => {
            return fetch(API.GOOGLE_DRIVE + '/files', get_config)
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                console.log(json);
            });
        }
    },

    chooseActive: function chooseActive(active) {
        return dispatch => {
            return dispatch({
                type: types.CHOOSE_FILE,
                activeFile: active.file,
                title: active.title,
            });
        }
    }
}