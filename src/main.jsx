import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import LayoutProvider from './Providers/LayoutProvider.jsx';
import DataProvider from './Providers/DataProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <LayoutProvider>
            <DataProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </DataProvider>
        </LayoutProvider>
    </React.StrictMode>
);
