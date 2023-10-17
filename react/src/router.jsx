import {
  Navigate,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./views/Login";
import SighUp from "./views/SighUp";
import User from "./views/User";
import Notfound from "./views/Not-found";
import DefualtLayout from "./components/DefualtLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import Try from "./views/Try";
import GoogleCallback from "./views/GoogleCallback";
import Search from "./views/Search";
import Post from "./views/Post";
import ViewImage from "./views/ViewImage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefualtLayout />,
    children: [
      {
        path: "/post",
        element: <Post />
      },
      {
        path: "/views",
        element:<ViewImage/>
      },
      {
        path: "/search",
        element: <Search />
      },
      {
        path: "/",
        element: <Navigate to="/users" />

      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/users",
        element: <User />
      },
    ]
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/auth/google",
        element: <GoogleCallback />
      },

      ,

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sighup",
        element: <SighUp />
      },
    ]
  },
  {
    path: "/try",
    element: <Try />
  },
  {
    path: "*",
    element: <Notfound />
  }
]);


export default router;