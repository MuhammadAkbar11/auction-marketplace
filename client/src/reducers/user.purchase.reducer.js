import {
  USER_MYBIDS_REQ,
  USER_MYBIDS_SUCCESS,
  USER_MYBIDS_FAIL,
} from "../constants/user.contanst";

export const userMyBidsReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case USER_MYBIDS_REQ:
      return { ...state, loading: true };
    case USER_MYBIDS_SUCCESS:
      return { ...action.payload };
    case USER_MYBIDS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
