import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import Nav from "../Components/Nav/Nav";

import "../App.scss";
import { AuthContext } from "../Context/Auth";

const AppLayout = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="app">
      <Nav />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
