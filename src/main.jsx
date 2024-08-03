import React from 'react'
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';
//import Root from './routes/root';
import ErrorPage from './error-page';
// import Contact from './routes/contact';

import Root, { loader as rootLoader, action as rootAction } from "./routes/root"  // importing and setting the action on the route

import Contact, { loader as contactLoader, action as contactAction } from './routes/contact';

import EditContact, { action as editAction } from './routes/edit';  // imported action as editAction to wire the action up to the route

// Adding the destroy route to the route config
import { action as destroyAction } from './routes/destroy';

import Index from './routes/index';

// Creating the root rout
const router = createBrowserRouter([
  {
    path: '/',
    // Setting <Root> as the root route's element
    element: <Root />,
    errorElement: <ErrorPage />,

    // using the loader
    loader: rootLoader,
    action: rootAction,

    children: [     // this is added to  Wrap the child routes in a pathless route
      {
        errorElement: <ErrorPage />,   // with this error page that will display when a contact that's not exist is requested in URL
        // making the contact route a child of the root route to be displayed into 
      // the root layout frame

        children: [  
      {
        index: true,
        element: <Index />
      },

      { 
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: contactAction,
      },
      // Now after making the components that we need to be displayed as children to the root layout
      // we need also to tell the root layout where to display its children.
      // this is where we add use <Outlet> in layout.

      {
        path: "contacts/:contactId/edit",
        element: < EditContact />,
        loader: contactLoader,
        action: editAction,
      },

      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
        errorElement: <div> Oops! There was an error.</div>,
      }
    ]
        
      }
    ]   
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);


/* 
How did the sidebar update? Where did we call the action? where's the code to refetch
the data? where are useState, onSubmit and useEffect

This is where the "old school web" programming model shows up. As known, <Form>
prevents the browser from sending the request to the server and sends it to your
action instead.

*/