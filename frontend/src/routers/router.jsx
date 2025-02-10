import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Home from "../customer/src/pages/home/Home"
import Customer from '../customer/src/Customer';
import Vendor from '../vendor/src/Vendor';
//import customerRouter from "../customer/src/routers/router.jsx";
//import vendorRouter from "../vendor/src/routers/router.jsx";
  import App from '../App';
  import Login from "../components/Login";
  import Registration from "../components/Registration";
  import CustomerReg from "../components/CustomerReg";
  import VendorReg from "../components/VendorReg";
  import customerRouter from "../customer/src/routers/router.jsx"
import vendorRouter from "../vendor/src/routers/router.jsx"
import EtherealBeautyBody from '../components/About';
import ProductPage from "../customer/src/pages/products/ProductPage.jsx";
import SingleProduct from "../customer/src/pages/products/SingleProduct.jsx";
import About from "../components/About.jsx"
import Search from "../customer/src/pages/search/Search.jsx"



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
      children:[
        {
          index: true,
          element: <Home />,
        },
        {
          path: "about",
          element: <EtherealBeautyBody />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Registration />,
          children: [
            {
              path: "customer",
              element: <CustomerReg />,
            },
            {
              path: "vendor",
              element: <VendorReg />,
            },
          ],
  },
  {
      path: "/login", 
      element: <Login />
  },
  {
    path: "/register", 
    element: <Registration />, 
    children: [
      {
        path: "customer", element: <CustomerReg /> },
      {
        path: "vendor", element: <VendorReg />}
    ]
  },
  {
    path: '/customer',
    // element: <Customer/>,
    children: customerRouter.routes
  },
  {
    path: '/vendor',
    // element: <Vendor />,  
        children: vendorRouter.routes
  },
  {path:"/product", element:<ProductPage/>},
  {path:"/product/:id", element:<SingleProduct/>},
  {path:"/aboutus", element: <About/>},
  {path:"/search", element: <Search/>}]}
  // {path:"/contact", element:<Contact/>},
]);

export default router;