/**
* Active sound actions
* author: @patr
*/

import types from '../config/action-types';
// import fetch from 'isomorphic-fetch';
import API from '../config/api';
import Helpers from './helpers';

// Settings
import { GOOGLE_API_KEY, IOS_GOOGLE_CLIENT_ID } from '../config/settings';

function allFolders(folders) {
    return {
        type: types.ALL_FOLDERS,
        isFetchingFolders: false,
        folders: folders,
        files: [],
    };
}

function fetchingFolders() {
    return {
        type: types.FETCHING_FOLDERS,
        isFetchingFolders: true,
    }
}

function fetchingFiles() {
    return {
        type: types.FETCHING_FILES,
        isFetchingFiles: true,
    }
}

function chooseActiveFile(file_url, title) {
    return {
        type: types.CHOOSE_FILE,
        activeFile: file_url,
        title: title,
    };
}

function activeFolder(folderId) {
    return {
        type: types.ACTIVE_FOLDER,
        activeFolder: folderId,
    };
}

function getFiles(files, folderId) {
    return {
        type: types.GET_FILES,
        isFetchingFiles: false,
        files: files,
        activeFolder: folderId,
    };
}

module.exports = {
    getFolders: function getFolders(apiToken) {
        var get_config = API.GET_CONFIG;
        get_config.headers['Authorization'] = `Bearer ${apiToken}`;
        return dispatch => {
            dispatch(fetchingFolders());
            return fetch(API.GOOGLE_DRIVE + API.FOLDER_URL, get_config)
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                return dispatch(allFolders(json.files));
            });
        }
    },

    getFileList: function getFileList(apiToken, folderId) {
        var get_config = API.GET_CONFIG;
        get_config.headers['Authorization'] = `Bearer ${apiToken}`;

        return dispatch => {
            dispatch(fetchingFiles());
            return fetch(API.GOOGLE_DRIVE + `/files?q='${folderId}'+in+parents&key=${GOOGLE_API_KEY}`, get_config)
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                return dispatch(getFiles(json.files, folderId));
            });
        }
    },

    chooseActive: function chooseActive(apiToken, fileID) {
        return dispatch => {
            var url = API.GOOGLE_DRIVE + `/files/${fileID}?access_token=${apiToken}`;
            return fetch(url, API.GET_CONFIG)
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                var active_url = url + '&alt=media'
                return dispatch(chooseActiveFile(active_url, json.name));
            });
        }
    }
}