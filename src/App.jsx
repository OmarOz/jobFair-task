import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home/Home'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout'
import Details from './components/Details/Details'

function App() {
  let router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'details/:id', element: <Details /> },
      ],
    },
  ], {
    basename: '/jobFair-task',  // Set the basename for the router
  });

  return (
    <RouterProvider router={router} />
  );
}

export default App;