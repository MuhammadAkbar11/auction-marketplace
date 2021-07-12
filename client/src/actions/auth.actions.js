import axios from "axios";

import {
  AUTH_LOGIN_FAIL,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_REST_FAIL,
  AUTH_LOGIN_SUCCESS,
  AUTH_REGISTER_FAIL,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_REST_FAIL,
  AUTH_REGISTER_SUCCESS,
  AUTH_REMOVE_USER,
  AUTH_SET_USER,
} from "../constants/auth.constants";
import { setLogout } from "../utils/auth";

export const authLoginAction =
  ({ email, password }) =>
  async dispatch => {
    try {
      dispatch({
        type: AUTH_LOGIN_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      dispatch({
        type: AUTH_LOGIN_SUCCESS,
      });

      dispatch({
        type: AUTH_SET_USER,
        payload: data.user,
      });

      localStorage.setItem("baebid_userInfo", JSON.stringify(data.user));
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
        type: AUTH_LOGIN_FAIL,
        payload: errData,
      });
    }
  };

export const authRegisterAction = values => async dispatch => {
  try {
    dispatch({
      type: AUTH_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/auth/register",
      { ...values },
      config
    );

    dispatch({
      type: AUTH_REGISTER_SUCCESS,
    });

    dispatch({
      type: AUTH_SET_USER,
      payload: data.user,
    });

    //
    localStorage.setItem("baebid_userInfo", JSON.stringify(data.user));
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
      type: AUTH_REGISTER_FAIL,
      payload: errData,
    });
  }
};

export const authLoginErrorMessageAction = message => dispatch => {
  dispatch({
    type: AUTH_LOGIN_FAIL,
    payload: {
      message: message,
    },
  });
};

export const authResetErrorAction =
  (type = "login") =>
  dispatch => {
    if (type === "login") {
      dispatch({
        type: AUTH_LOGIN_REST_FAIL,
      });
    } else {
      dispatch({
        type: AUTH_REGISTER_REST_FAIL,
      });
    }
  };

export const authLogoutAuction = () => dispatch => {
  setLogout();
  dispatch({ type: AUTH_REMOVE_USER, payload: null });
  document.location.href = "/";
};
