import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import Saga from './sagas';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// redux middlewares
const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

// redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = applyMiddleware(routerMiddleware(history), sagaMiddleware);

const store = createStore(reducers, composeEnhancers(middleware));

// run saga middleware
sagaMiddleware.run(Saga);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
