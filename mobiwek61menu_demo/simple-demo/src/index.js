import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// index.js does not use the package. Call the module which does use it.
import { ReactAppForDevelopment } from './ReactAppForDevelopment'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  < ReactAppForDevelopment />
)
// note: <React.StrictMode/> tags removed, as it won't run
