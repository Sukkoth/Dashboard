import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import LayoutProvider from './Providers/LayoutProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <LayoutProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </LayoutProvider>
    // </React.StrictMode>
);
