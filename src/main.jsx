import React from 'react'
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';
import Root from './routes/root';
import ErrorPage from './error-page';


// Creating the root rout
const router = createBrowserRouter([
  {
    path: '/',
    // Setting <Root> as the root route's element
    element: <Root />,
    errorElement: <ErrorPage/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
