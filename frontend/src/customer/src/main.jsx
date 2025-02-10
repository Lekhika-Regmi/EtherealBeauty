import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Customer from './Customer.jsx'
import { RouterProvider } from 'react-router-dom'
import customerRouter from './routers/router.jsx'
import 'remixicon/fonts/remixicon.css'

import { Provider } from 'react-redux'
import { store } from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={customerRouter}/> {/* Using the router from the routing setup */}
    </Provider>
  </StrictMode>
);