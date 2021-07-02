import axios from "axios";

import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_SET_AUTH,
  ADMIN_REMOVE_AUTH,
  ADMIN_LOGIN_RESET,
} from "../../constants/admin/auth.constant";
import { setAdminLogin, setAdminLogout } from "../../utils/auth";

export const authAdminLoginAction =
  ({ idAdmin, password }) =>
  async dispatch => {
    dispatch({
      type: ADMIN_LOGIN_REQUEST,
    });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/admin/login",
        { idAdmin, password },
        config
      );

      dispatch({
        type: ADMIN_LOGIN_SUCCESS,
      });
      dispatch({
        type: ADMIN_SET_AUTH,
        payload: data.admin,
      });

      setAdminLogin(JSON.stringify(data.admin));
    } catch (error) {
      let errData = {
        message: error.message,
      };

      if (error.response && error.response.data.message) {
        const errorData =
          error.response.data.errors && error.response.data.errors;
        errData = {
          message: error.response.data.message,
          ...errorData,
        };
      }

      dispatch({
        type: ADMIN_LOGIN_FAIL,
        payload: errData,
      });
    }
  };

export const authAdminResetErrorAction = () => dispatch => {
  dispatch({
    type: ADMIN_LOGIN_RESET,
  });
};

export const authAdminLogoutAuction = history => dispatch => {
  setAdminLogout();
  dispatch({ type: ADMIN_REMOVE_AUTH, payload: null });
  history.push("/administrator/login");
};
