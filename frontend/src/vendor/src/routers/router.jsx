import { createBrowserRouter } from 'react-router-dom';
import Vendor from '../../../vendor/src/Vendor';
import CreateProduct from '../page/shop/CreateProduct';
import AllProducts from '../page/shop/AllProducts';
import Dashboard from '../page/shop/Dashboard';
import EditProducts from '../page/shop/EditProducts';
import Registration from '../../../components/Registration';
import CustomerReg from '../../../components/CustomerReg';
import VendorReg from '../../../components/VendorReg';
import Login from '../../../components/Login';

const vendorRouter = [
    {
        path: "/vendor",
        element: <Vendor />, // App serves as the layout (with Sidebar)
        children: [
            {
                path: "dashboard",  // Root route for Dashboard
                element: <Dashboard />, // Dashboard page will render here
            },
            {
                path: "dashboard-create-product", // Route for Create Product page
                element: <CreateProduct />,
            },
            {
                path: "dashboard-products", // Route for All Products page
                element: <AllProducts />,
            },
            {
                path: "edit-product/:id", // Route for Edit Product page
                element: <EditProducts />,
            },
        ],
    }
   
];

export default { routes: vendorRouter };
