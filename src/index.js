import React from 'react';  // Import React once
import { disableReactDevtools } from "@fvilers/disable-react-devtools"; // Named import

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

if (process.env.NODE_ENV === 'production') {
  disableReactDevtools();  // Disable React DevTools in production
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);




