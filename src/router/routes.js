import Login from '../components/login/Login'
import Register from '../components/register/Register'
import Profile from '../components/profile/Profile'
import Events from "../components/events/Events";
import CreateEvents from "../components/events/CreateEvents";

export const privateRoutes = [
    {path: "/profile", element: <Profile />},
    {path: "/events", element: <Events />},
]

export const publicRoutes = [
    {path: "/login", element: <Login />},
    {path: "/register", element: <Register />},
]

export const adminRoutes = [
    {path: "/create-event", element: <CreateEvents />},
]

