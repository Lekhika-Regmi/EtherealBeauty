import React from 'react';
import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routers/router.jsx';


import { Provider } from "react-redux";
import { store } from "./customer/src/redux/store.js"; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} /> 
    </Provider>
  </React.StrictMode>
);
