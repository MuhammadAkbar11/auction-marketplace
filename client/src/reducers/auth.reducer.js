import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_FAIL,
  AUTH_SET_USER,
  AUTH_REMOVE_USER,
} from "../constants/auth.constants";

export const authLoginReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { loading: true };
    case AUTH_LOGIN_SUCCESS:
      return { ...state, loading: false };
    case AUTH_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const registerInitState = {
  loading: false,
};

export const authRegisterReducer = (state = registerInitState, action) => {
  switch (action.type) {
    case AUTH_REGISTER_REQUEST:
      return { loading: true };
    case AUTH_REGISTER_SUCCESS:
      return { ...state, loading: false };
    case AUTH_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const authUserReducer = (state = { userInfo: null }, action) => {
  switch (action.type) {
    case AUTH_SET_USER:
      return { ...state, userInfo: action.payload };
    case AUTH_REMOVE_USER:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};
