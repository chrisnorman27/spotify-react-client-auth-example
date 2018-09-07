import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

const initialAuthState = {
    token: null,
    error: null
};

const authReducer = (state = initialAuthState, { type, payload }) => {
    switch (type) {
        case AUTH_SUCCESS: {
            return { ...state, token: payload };
        }
        case AUTH_FAILURE: {
            return { ...state, error: payload };
        }
        default:
            return state;
    }
};

export default combineReducers({
    auth: authReducer,
    router: routerReducer
});
