import disableReactDevtools from "@fvilers/disable-react-devtools";  // Default import

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

if (process.env.NODE_ENV === 'production') {
  disableReactDevtools();  // Call it here in production
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {disableReactDevtools} from "@fvilers/disable-react-devtools"

if (process.env.NODE_ENV === 'production') disableReactDevtools()


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


