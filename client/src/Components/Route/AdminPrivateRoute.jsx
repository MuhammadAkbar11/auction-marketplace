import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { isAdminLogin } from "../../utils/auth";

const AdminPrivateRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  React.useEffect(() => {
    const adminInfoFromStorage = localStorage.getItem("baebid_adminInfo");
    if (!adminInfoFromStorage && adminInfoFromStorage === undefined) {
      history.push("/administrator/login");
    }
  }, [history]);

  return (
    <Route
      {...rest}
      render={props =>
        isAdminLogin() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/administrator/login" />
        )
      }
    />
  );
};

export default AdminPrivateRoute;
