import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import LoginPage from './Pages/LoginPage/LoginPage'
import HomePage from './Pages/HomePage/HomePage';

import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Error Loading Page</h1>
  },
  {
    path: "/home",
    element: <HomePage />,
    errorElement: <h1>Error Loading Page</h1>
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <h1>Error Loading Page</h1>
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <h1>Error Loading Page</h1>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
