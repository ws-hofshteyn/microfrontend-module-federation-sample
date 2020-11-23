import React, { useState, useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Microfrontend from './containers/MicrofrontendContainer';
import dispatchEvent, { eventsToDispatch } from './events';

import './App.css';

const history = createBrowserHistory();
const defaultTheme = 'theme-light';

const App = () => {

    const [activeTheme, setTheme] = useState(defaultTheme);
    useEffect(() => {
        document.documentElement.style['background-color'] = activeTheme === 'theme-light' ? 'white' : 'black';
    }, [activeTheme])

    const changeTheme = () => {
        const theme = activeTheme === 'theme-light' ? 'theme-dark' : 'theme-light';
        setTheme(theme);
        dispatchEvent(eventsToDispatch.THEME_CHANGED, theme);
    }
    return (
        <Router history={history}>
            <Switch>
                <Route path="/">
                    <h1 style={activeTheme === 'theme-light' ? {color: 'black'} : {color: 'white'}}>Hello! I'm a root app!</h1>
                    <Microfrontend />
                    <button onClick={changeTheme}>Change theme</button>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;