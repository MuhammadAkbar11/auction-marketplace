import {
  TEMP_REQUEST,
  TEMP_SUCCESS,
  TEMP_FAIL,
  TEMP_RESET,
} from "../constants/temp.constants";

export const tempReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case TEMP_REQUEST:
      return { ...state, loading: true };
    case TEMP_SUCCESS:
      return { ...state, ...action.payload };
    case TEMP_FAIL:
      return { loading: false, error: action.payload };
    case TEMP_RESET: {
      return { ...state, success: null, error: null, loading: false };
    }
    default:
      return state;
  }
};
