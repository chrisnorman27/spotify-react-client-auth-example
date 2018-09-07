import { call, take, put, takeLatest, all } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import { AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS } from './reducers';
import Api from './api';

/** Spotify constants */
const CLIENT_ID = process.env.REACT_APP_SPOTIFY_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const STATE_KEY = 'spotify_auth_state';
const scope = 'user-read-private user-read-email user-library-read';

/**
 * Obtains parameters from the hash of the URL - taken from Spotify auth example
 * @return Object
 */
const getHashParams = hash => {
    const hashParams = {};
    let e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = hash.substring(1);
    while ((e = r.exec(q))) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
};

/** Generates a random string containing numbers and letters of 16 characters */
const generateStateToken = () =>
    (Math.random().toString(36) + Array(16).join('0')).slice(2, 16 + 2);

const setStateToken = state => localStorage.setItem(STATE_KEY, state);
const getStateToken = () => localStorage.getItem(STATE_KEY);
const removeStateToken = () => localStorage.removeItem(STATE_KEY);

const getPathnameFromUrlString = urlString => {
    const url = new URL(urlString);
    return url.pathname;
};

function* redirectToLoginUrl() {
    const state = yield call(generateStateToken);
    const loginUrl = yield call(
        Api.generateLoginUrl,
        CLIENT_ID,
        scope,
        REDIRECT_URI,
        state
    );
    yield call(setStateToken, state);
    yield call(Api.redirectTo, loginUrl);
}

function* watchForLoginCallback() {
    // load the current router location
    const action = yield take('@@router/LOCATION_CHANGE');
    const callbackPathname = yield call(getPathnameFromUrlString, REDIRECT_URI);

    // continue only if the current pathname matches our spotify callback pathname (eg '/callback')
    if (action.payload.pathname === callbackPathname) {
        const params = yield call(getHashParams, action.payload.hash);

        const { access_token, state } = params;
        const storedState = yield call(getStateToken);
        if (access_token && (state == null || state !== storedState)) {
            yield put({ type: AUTH_FAILURE, payload: 'auth failure' });
        } else {
            yield call(removeStateToken);
            yield put({ type: AUTH_SUCCESS, payload: access_token });
            yield put(replace('/next-page'));
        }
    }
}

function* Saga() {
    yield all([
        takeLatest(AUTH_REQUEST, redirectToLoginUrl),
        watchForLoginCallback()
    ]);
}

export default Saga;
