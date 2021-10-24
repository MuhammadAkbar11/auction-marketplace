import {
  USER_DB_AUCTIONS_REQ,
  USER_DB_AUCTIONS_SUCCESS,
  USER_DB_AUCTIONS_FAIL,
} from "../constants/user.contanst";

const iniState = {
  loading: false,
  auctions: {},
};

export const userDashboardReducer = (state = iniState, action) => {
  switch (action.type) {
    case USER_DB_AUCTIONS_REQ:
      return { ...state, loading: true };
    case USER_DB_AUCTIONS_SUCCESS:
      return { ...state, ...action.payload };
    case USER_DB_AUCTIONS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
