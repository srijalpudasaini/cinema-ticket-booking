import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider} from 'react-router'
import Home from './routes/Home.jsx'
import Dashboard from './routes/admin/Dashboard.jsx'
import Layout from './routes/layouts/Layout.jsx'
import AdminLayout from './routes/layouts/AdminLayout.jsx'
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
import AddMovie from './routes/admin/Movie/AddMovie.jsx'
import Movies from './routes/admin/Movie/Movies.jsx'
import AddShow from './routes/admin/Show/AddShow.jsx'
import Shows from './routes/admin/Show/Shows.jsx'
import AddHall from './routes/admin/Hall/AddHall.jsx'
import Halls from './routes/admin/Hall/Halls.jsx'
import AddSeat from './routes/admin/Seat/AddSeat.jsx'
import Seats from './routes/admin/Seat/Seats.jsx'
import ViewShow from './routes/admin/Show/ViewShow.jsx'
import AdminProfile from './routes/admin/AdminProfile.jsx'
import AdminChangePassword from './routes/admin/AdminChangePassword.jsx'
import AddUser from './routes/admin/User/AddUser.jsx'
import Users from './routes/admin/User/Users.jsx'
import ViewUser from './routes/admin/User/ViewUser.jsx'

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
            path:'',
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
        path:"movie/add",
        element:<AddMovie/>
      },
      {
        path:"movies",
        element:<Movies/>
      },
      {
        path:"show/add",
        element:<AddShow/>
      },
      {
        path:"show/view",
        element:<ViewShow/>
      },
      {
        path:"shows",
        element:<Shows/>
      },
      {
        path:"hall/add",
        element:<AddHall/>
      },
      {
        path:"halls",
        element:<Halls/>
      },
      {
        path:"seat/add",
        element:<AddSeat/>
      },
      {
        path:"seats",
        element:<Seats/>
      },
      {
        path:"user/add",
        element:<AddUser/>
      },
      {
        path:"user/view",
        element:<ViewUser/>
      },
      {
        path:"users",
        element:<Users/>
      },
      {
        path:'profile',
        element:<AdminProfile/>
      },
      {
        path:'profile/change-password',
        element:<AdminChangePassword/>
      },
    ]
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
