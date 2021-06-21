import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../../utils/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userInfo } = useSelector(state => state.authUser);

  React.useLayoutEffect(() => {
    console.log(userInfo);
  }, []);

  return (
    <Route
      {...rest}
      render={props =>
        isLogin() ? <Component {...props} /> : <Redirect to="/akun/masuk" />
      }
    />
  );
};

export default PrivateRoute;
