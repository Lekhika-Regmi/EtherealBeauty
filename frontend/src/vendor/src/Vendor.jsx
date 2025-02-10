import { useState } from 'react'
import { Outlet } from 'react-router-dom';


import './Vendor.css'
import Navbar from './components/Navbar';
import DashboardSideBar from './page/layout/DashboardSideBar';

function Vendor() {

  return (
    <>
    <Navbar/>
    <div className="flex">
                {/* Sidebar */}
                <DashboardSideBar />
                {/* Main content */}
                <div className="flex-1">
                    <Outlet /> {/* This will render the CreateProduct component */}
                </div>
            </div>
    </>
  )
}

export default Vendor
