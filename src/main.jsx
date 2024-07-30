import React from 'react'
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';
//import Root from './routes/root';
import ErrorPage from './error-page';
import Contact from './routes/contact';

import Root,{loader as rootLoader } from "./routes/root"


// Creating the root rout
const router = createBrowserRouter([
  {
    path: '/',
    // Setting <Root> as the root route's element
    element: <Root />,
    errorElement: <ErrorPage />,

    // using the loader
    loader : rootLoader,

    // making the contact route a child of the root route to be displayed into 
    // the root layout frame

    children: [  
      {
        path: "contacts/:contactId",
        element: <Contact />,
      }
      // Now after making the components that we need to be displayed as children to the root layout
      // we need also to tell the root layout where to display its children.

      // this is where we add use <Outlet> in layout
    ]   
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);