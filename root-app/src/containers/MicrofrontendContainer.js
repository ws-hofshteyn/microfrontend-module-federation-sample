import React, { lazy, Suspense } from 'react';

const MicrofrontendApp = lazy(() => import("microfrontendApp/MicrofrontendService"));

const Microfrontend = (props) => {
    return (
        <Suspense fallback="Loading MicrofrontendApp">
            <MicrofrontendApp theme={props.theme}/>
        </Suspense>
    ); 
};

export default Microfrontend;