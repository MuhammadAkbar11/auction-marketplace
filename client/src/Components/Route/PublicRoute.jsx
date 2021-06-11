import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const { userInfo } = useSelector(state => state.authUser);

  return (
    <Route
      {...rest}
      render={props => {
        return userInfo !== null && restricted ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

export default PublicRoute;
