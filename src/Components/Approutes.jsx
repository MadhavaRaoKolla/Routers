import React, { useContext } from "react";
import { useRoutes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Error from "../Pages/Error/Error";
import Form from "./Form/Form";
import Profile from "../Pages/Profile/Profile";
import { AuthContext } from "../Context/Auth";
import AppLayout from "../Layouts/AppLayout";

const Approutes = () => {
  const { loading } = useContext(AuthContext);

  const routes = useRoutes([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "form", element: <Form /> },
        { path: "profile", element: <Profile /> },
      ],
    },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    { path: "*", element: <Error /> },
  ]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{routes}</>;
};

export default Approutes;
