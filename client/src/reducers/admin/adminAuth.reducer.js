import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_SET_AUTH,
  ADMIN_REMOVE_AUTH,
  ADMIN_LOGIN_RESET,
} from "../../constants/admin/auth.constant";

export const adminLoginReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return { loading: true };
    case ADMIN_LOGIN_SUCCESS:
      return { loading: false };
    case ADMIN_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_LOGIN_RESET: {
      return { loading: false };
    }
    default:
      return state;
  }
};

export const authAdminReducer = (state = { adminInfo: null }, action) => {
  switch (action.type) {
    case ADMIN_SET_AUTH:
      return { adminInfo: action.payload };
    case ADMIN_REMOVE_AUTH:
      return { adminInfo: action.payload };
    default:
      return state;
  }
};
