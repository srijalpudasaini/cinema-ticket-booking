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
import Booking from './routes/Booking.jsx'
import Login from './routes/Login.jsx'
import Register from './routes/Register.jsx'
import UserLayout from './routes/layouts/UserLayout.jsx'
import Reservation from './routes/user/Reservation.jsx'
import Profile from './routes/user/Profile.jsx'
import History from './routes/user/History.jsx'
import Tickets from './routes/user/Tickets.jsx'
import ChangePassword from './routes/user/ChangePassword.jsx'

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
      {
        path:"booking",
        element: <Booking/>
      },
      {
        path:"login",
        element: <Login/>
      },
      {
        path:"register",
        element: <Register/>
      },
      {
        path:"user/",
        element:<UserLayout/>,
        children:[
          {
            path:'reservations',
            element:<Reservation/>
          },
          {
            path:'profile',
            element:<Profile/>
          },
          {
            path:'history',
            element:<History/>
          },
          {
            path:'tickets',
            element:<Tickets/>
          },
          {
            path:'change-password',
            element:<ChangePassword/>
          },
        ]
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
