import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider} from 'react-router'
import Home from './routes/Home.jsx'
import Dashboard from './routes/admin/Dashboard.jsx'
import Layout from './routes/layouts/Layout.jsx'
import AdminLayout from './routes/layouts/AdminLayout.jsx'
import Add from './routes/admin/Add.jsx'
import About from './routes/About.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout/>,
    children:[
      {
        path:"",
        element: <Home/>
      },
      {
        path:"about",
        element: <About/>
      },
    ]
  },
  {
    path: "/admin/",
    element: <AdminLayout/>,
    children:[
      {
        path:"",
        element:<Dashboard/>
      },
      {
        path:"add",
        element:<Add/>
      }
    ]
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
