import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AUTH_REQUEST } from './reducers';

import logo from './logo.svg';
import './App.css';

export class App extends Component {
    loginAction = () => {
        this.props.dispatch({ type: AUTH_REQUEST });
    };
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <h2>Auth Status:</h2>
                <pre>{JSON.stringify(this.props.auth)}</pre>
                <button onClick={this.loginAction}>Login to Spotify</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(App);
