# spotify-react-client-auth-example

An example of client-side authorization for the Spotify API in React using Redux, Redux-Saga, React-Router, and react-router-redux 5.x.

The app uses the [Spotify implicit grant login flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow) to authorize the user with Spotify without requiring any server-side code.

The login flow is driven entirely through Redux-Saga side effects, allowing the auth logic to be decoupled from the UI components.

Bootstrapped with create-react-app.

Another tutorial I found useful [here.](https://medium.com/@stepankuzmin/authentication-with-react-router-redux-5-x-and-redux-saga-55da66b54be7)

## Getting started
Install dependencies: `yarn install`

Create a file called `.env.development.local` in the root of the repository. The contents of the file should be:

```
REACT_APP_SPOTIFY_ID=<your Spotify app ID>
REACT_APP_REDIRECT_URI=<your Spotify redirect URI (must be registered with the Spotify developer dashboard)>
```

Run the app: `yarn start`