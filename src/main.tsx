import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from "react-router-dom"
import { Root } from "./pages/root"
import { Issuer } from './pages/issuer'
import { Verifier } from './pages/verifier'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={createHashRouter([
      {
        path: "/",
        element: <Root />,
      },
      {
        path: "/issuer",
        element: <Issuer />,
      },
      {
        path: "/verifier",
        element: <Verifier />,
      }
    ])} />
  </React.StrictMode>,
)
