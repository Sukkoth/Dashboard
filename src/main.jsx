import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import LayoutProvider from './Providers/LayoutProvider.jsx';
import DataProvider from './Providers/DataProvider.jsx';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';

//Custom fonts
import './fonts.css';
//Custom CSS
import './App.css';
// Fontawesome Icons
import '@fortawesome/fontawesome-free/css/all.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider>
      <LayoutProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LayoutProvider>
    </DataProvider>
  </React.StrictMode>
);
