import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { AUTH_REQUEST } from './reducers';
import Saga from './sagas';
import Api from './api';

const fakeLoginUrl =
    'https://accounts.spotify.com/en/authorize?' +
    'response_type=token&client_id=00000' +
    '&scope=user-read-private%20user-read-email%20user-library-read' +
    '&redirect_uri=http:%2F%2Flocalhost:3000%2Fcallback&state=8zrcuwljaf900000';

it('redirects to login url after auth request', () => {
    return expectSaga(Saga)
        .provide([[matchers.call.fn(Api.generateLoginUrl), fakeLoginUrl]])
        .call(Api.redirectTo, fakeLoginUrl)
        .dispatch({ type: AUTH_REQUEST })
        .run();
});
