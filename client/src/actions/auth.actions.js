import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
} from "../constants/auth.constants";

export const authLoginAction =
  ({ email, password }) =>
  async dispatch => {
    try {
      dispatch({
        type: AUTH_LOGIN_REQUEST,
      });

      console.log(email, password);

      setTimeout(() => {
        dispatch({
          type: AUTH_LOGIN_SUCCESS,
        });
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

export const authRegisterAction = values => async dispatch => {
  try {
    dispatch({
      type: AUTH_REGISTER_REQUEST,
    });

    console.log(values, "action");

    setTimeout(() => {
      dispatch({
        type: AUTH_REGISTER_SUCCESS,
      });
    }, 5000);
  } catch (error) {
    console.log(error);
  }
};
