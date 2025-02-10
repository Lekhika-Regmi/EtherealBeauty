import React from 'react';
import { createBrowserRouter, Route } from 'react-router-dom';
import Customer from '../Customer';
import { Outlet } from 'react-router-dom';
import Home from "../pages/home/Home";
import BrandPage from "../pages/brands/BrandPage";
import Search from "../pages/search/Search";
import ProductPage from "../pages/products/ProductPage";
import SingleProduct from "../pages/products/SingleProduct";
import WebcamCapture from "../pages/home/WebcamCapture";

import Registration from '../../../components/Registration';
import CustomerReg from '../../../components/CustomerReg';
import VendorReg from '../../../components/VendorReg';
import Login from '../../../components/Login';

import Checkout from '../pages/products/CheckoutPage';


const customerRouter = [
  {
    path: '/customer',
    element: <Customer />,
    children:[
        { path:"", element: <Home/>},
        { path:"brands/:brandName", element: <BrandPage/>},
        {path:"search", element:<Search/>},
        {path:"webcam", element:<WebcamCapture/>},
       
        {path:"checkout", element:<Checkout/>},
 
    ]
  },
  
];

export default { routes: customerRouter };