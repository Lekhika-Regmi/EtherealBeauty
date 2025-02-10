import React from 'react'
import Navbar from './customer/src/components/Navbar';
import Footer from './customer/src/components/Footer';
// import Customer from './customer/src/Customer';
// import Vendor from './vendor/src/Vendor';
// import CustomerReg from './components/CustomerReg'
// import Login from './components/Login'
// import Registration from './components/Registration'
// import VendorReg from './components/VendorReg'
import './App.css'
import { useState } from 'react';

import { Outlet } from 'react-router-dom'




function App() {
  const [count, setCount] = useState(0)

  return (
<div>
<Navbar/>
<Outlet/>
<Footer/>

</div>
  //   <Navbar/>
  //    <Registration/>
  //   <CustomerReg/>
  //   <VendorReg/>
  //   <Login/>
  //   <Customer/>
  //   <Vendor/>
  //   <Footer/>

  //  </Outlet>


  );
}

export default App;
