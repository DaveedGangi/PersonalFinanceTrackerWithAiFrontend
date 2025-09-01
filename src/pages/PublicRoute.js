// PublicRoute.js
import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    fetch("https://personalfinancewithaidaveed.onrender.com/auth/me", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setIsAuth(!!data.user);
        setLoading(false);
      })
      .catch(() => {
        setIsAuth(false);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Route
      {...rest}
      render={props =>
        isAuth && restricted ? <Redirect to="/dashboard" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
