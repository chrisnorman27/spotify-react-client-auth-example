export default {
    generateLoginUrl(client_id, scope, redirect_uri, state) {
        return (
            `https://accounts.spotify.com/authorize` +
            `?response_type=token` +
            `&client_id=${decodeURIComponent(client_id)}` +
            `&scope=${decodeURIComponent(scope)}` +
            `&redirect_uri=${decodeURIComponent(redirect_uri)}` +
            `&state=${decodeURIComponent(state)}`
        );
    },
    redirectTo(newUrl) {
        window.location.href = newUrl;
    }
};
