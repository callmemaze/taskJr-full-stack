import React, { useState, useEffect } from "react";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);
  return <div>{user ? children : <Navigate to="/login" />}</div>;
};

export default PrivateRoute;
