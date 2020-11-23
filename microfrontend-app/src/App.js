import React, { Suspense, useState } from 'react';

import './App.css';

const RootApp = React.lazy(() => import("rootApp/App"))

const App = () =>
    <Suspense fallback="Loading RootApp">
        <RootApp />
    </Suspense>

export default App;