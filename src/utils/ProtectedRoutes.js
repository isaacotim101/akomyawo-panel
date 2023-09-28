import React from "react";
import { Redirect, Route, Router } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuth = localStorage.getItem("isAuth");

  return (
    <Router
      {...restOfProps}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/auth/signin" />
      }
    />
  );
}

export default ProtectedRoute;
