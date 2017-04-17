/**
* nando
* Module define all API paths
* author: @patr
*/

const PRODUCTION_SITE = process.env.APP_ENV === 'production' ? 'www.getnando.com' : '';
const LOCALHOST = 'localhost:3000';

const BASE_URL = process.env.NODE_ENV === 'production' ? ('https://' + PRODUCTION_SITE + '/api/') : ('http://' + LOCALHOST + '/api/');

module.exports = {
    // URL's
    GOOGLE_LOGIN: BASE_URL + '/login/google',

    // REST Configs for Fetch API
    GET_CONFIG: {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    },

    POST_CONFIG: function POST_CONFIG(data) {
        return ({
            method: 'post',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        });
    },

    PUT_CONFIG: function PUT_CONFIG(data) {
        return ({
            method: 'put',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
    },
}
