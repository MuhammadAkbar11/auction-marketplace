import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAdminLogin } from "../../utils/auth";

const AdminPublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return isAdminLogin() && restricted ? (
          <Redirect to="/administrator/dashboard" />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

export default AdminPublicRoute;
