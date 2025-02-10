import React from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";

function Registration() {
    const location = useLocation();
    const isParentRoute = location.pathname === "/register";

    return (
        <section className='flex items-center justify-center min-h-screen bg-gray-50'>
            <div className='w-full max-w-4xl border shadow bg-white mx-auto p-8'>
                {isParentRoute && (
                    <>
                        <h2 className="text-2xl font-semibold pt-5">Welcome to Ethereal Beauty.</h2>

                        <Link
                            to="/register/customer"
                            className="w-full mt-5 text-white bg-rose-600 font-bold py-3 rounded-md text-center block"
                        >
                            Register as a Customer
                        </Link>

                        <Link
                            to="/register/vendor"
                            className="w-full mt-5 text-white bg-rose-600 font-bold py-3 rounded-md text-center block"
                        >
                            Register as a Vendor
                        </Link>

                        <p className='my-5 italic text-sm text-center'>
                            Already have an account? <Link to="/login" className='text-rose-600'>Log In</Link> here.
                        </p>
                    </>
                )}

                 {/* CustomerReg and VendorReg will be displayed here */} 
                <Outlet />
            </div>
        </section>
    );
}

export default Registration;
