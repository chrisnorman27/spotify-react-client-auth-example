const STATE_KEY = 'spotify_auth_state';

export default {
    set: state => localStorage.setItem(STATE_KEY, state),
    get: () => localStorage.getItem(STATE_KEY),
    remove: () => localStorage.removeItem(STATE_KEY)
};
