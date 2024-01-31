/*
Filename: index.js

Path: eventsManage/client/src/index.js

Code: JavaScript code for the index file of the client application (eventsManage) is
written in this file. This file is the entry point of the client application. The
ReactDOM.createRoot() method is used to create a root for the React application. The
ReactDOM.createRoot() method is used instead of ReactDOM.render() method because the
ReactDOM.createRoot() method is the recommended way to render the application in
production as it provides better performance and security benefits. 
*/

// Code dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Create a root for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
