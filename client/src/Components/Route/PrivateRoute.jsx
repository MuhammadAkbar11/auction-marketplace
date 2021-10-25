import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useHistory } from "react-router-dom";
import { isLogin } from "../../utils/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userInfo } = useSelector(state => state.authUser);
  const history = useHistory();
  React.useLayoutEffect(() => {
    // console.log(userInfo);
    if (!userInfo) {
      history.push("/akun/masuk");
    }
  }, [userInfo, history]);

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
