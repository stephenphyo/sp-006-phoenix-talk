import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

/*** Bootstrap Imports ***/
import 'bootstrap/dist/css/bootstrap.css';

/*** Context Provider Imports ***/
import { SidebarContextProvider } from 'contexts/SidebarContext';

/*** Redux Imports ***/
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux-app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <SidebarContextProvider>
                <App />
            </SidebarContextProvider>
        </PersistGate>
    </Provider>
);