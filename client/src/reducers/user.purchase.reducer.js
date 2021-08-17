import {
  USER_MYBIDS_REQ,
  USER_MYBIDS_SUCCESS,
  USER_MYBIDS_FAIL,
  USER_PURCHASE_MESSAGE,
  USER_PURCHASE_RESET_MESSAGE,
  USER_WINAUCTION_REQ,
  USER_WINAUCTION_SUCCESS,
  USER_WINAUCTION_FAIL,
  USER_WIN_CONFIRM_REQ,
  USER_WIN_CONFIRM_SUCCESS,
  USER_WIN_CONFIRM_FAIL,
  USER_GET_PAYMENT_REQ,
  USER_GET_PAYMENT_SUCCESS,
  USER_GET_PAYMENT_FAIL,
  USER_POST_PAYMENT_REQ,
  USER_POST_PAYMENT_SUCCESS,
  USER_POST_PAYMENT_FAIL,
} from "../constants/user.contanst";

export const userWinningAuctionReducer = (
  state = {
    loading: false,
    message: {
      show: false,
      type: "success",
      text: "",
    },
    auctions: [],
  },
  action
) => {
  switch (action.type) {
    case USER_PURCHASE_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case USER_PURCHASE_RESET_MESSAGE:
      return {
        ...state,
        message: {
          show: false,
          type: "success",
          text: "",
        },
      };
    case USER_WINAUCTION_REQ:
      return {
        ...state,
        loading: true,
      };
    case USER_WINAUCTION_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case USER_WINAUCTION_FAIL:
      return {
        ...state,
        auction: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

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

export const userWinningConfirmReducer = (
  state = { loading: false },
  action
) => {
  switch (action.type) {
    case USER_WIN_CONFIRM_REQ:
      return { ...state, loading: true };
    case USER_WIN_CONFIRM_SUCCESS:
      return { ...action.payload };
    case USER_WIN_CONFIRM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userPaymentDetailsReducer = (
  state = { loading: false, invoice: null },
  action
) => {
  switch (action.type) {
    case USER_GET_PAYMENT_REQ:
      return { ...state, loading: true };
    case USER_GET_PAYMENT_SUCCESS:
      return { ...action.payload };
    case USER_GET_PAYMENT_FAIL:
      return { loading: false, invoice: null, error: action.payload };
    default:
      return state;
  }
};
export const userPostPaymentReducer = (
  state = { loading: false, invoice: null },
  action
) => {
  switch (action.type) {
    case USER_POST_PAYMENT_REQ:
      return { loading: true, invoice: null };
    case USER_POST_PAYMENT_SUCCESS:
      return { ...action.payload };
    case USER_POST_PAYMENT_FAIL:
      return { loading: false, invoice: null, error: action.payload };
    default:
      return state;
  }
};
