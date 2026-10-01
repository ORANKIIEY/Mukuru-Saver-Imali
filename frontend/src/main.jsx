import React from 'react';
import ReactDOM from 'react-dom/client';
// Initialise react-i18next before the app renders so all components have a configured i18n instance.
import './i18n/i18next.js';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
