import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_CHANGE_PASSWORD_FAIL,
  USER_CHANGE_PASSWORD_RESET,
} from "../constants/user.contanst";

export const userDetailsReducer = (
  state = {
    loading: false,
    details: {},
  },
  action
) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, ...action.payload };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case USER_DETAILS_FAIL:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const userUpdateProfileReducer = (
  state = { loading: false },
  action
) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case USER_UPDATE_PROFILE_FAIL:
      return { ...state, ...action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
