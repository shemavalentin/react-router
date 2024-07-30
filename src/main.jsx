import React from 'react'
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterPorvider,
} from "react-router-dom";

import './index.css';


// Creating the root rout
const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterPorvider router={router} />
  </React.StrictMode>,
);
