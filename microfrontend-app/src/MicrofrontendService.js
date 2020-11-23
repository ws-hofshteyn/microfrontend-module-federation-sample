import React, { useState } from 'react';
import useWindowEventListener from './hooks/useEventsListener';

const eventsToListen = {
    THEME_CHANGED: 'THEME_CHANGED'
};

const MicrofrontendService = () => {

    const [activeTheme, setActiveTheme] = useState('theme-light');

    const handleThemeChanged = e => setActiveTheme(e.detail);
    useWindowEventListener(eventsToListen.THEME_CHANGED, handleThemeChanged);


    return (
        <h2 style={activeTheme === 'theme-light' ? {color: 'black'} : {color: 'white'}}>And I'm Microfrontend app!</h2>  
    );
};

export default MicrofrontendService;
