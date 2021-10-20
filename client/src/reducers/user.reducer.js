import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_AUCTION_REQ,
  USER_UPDATE_AUCTION_SUCCESS,
  USER_UPDATE_AUCTION_FAIL,
  USER_UPDATE_AUCTION_RESET,
  USER_AUCTION_DETAILS_REQ,
  USER_AUCTION_DETAILS_SUCCESS,
  USER_AUCTION_DETAILS_FAIL,
  USER_AUCTION_DETAILS_RESET,
  ADD_CATEGORY_AUCTION,
  ADD_DESC_AUCTION,
  ADD_TIME_PRICE_AUCTION,
  USER_CREATE_AUCTION_REQ,
  USER_CREATE_AUCTION_SUCCESS,
  USER_CREATE_AUCTION_FAIL,
  USER_CREATE_AUCTION_RESET,
  USER_AUCTION_REQ,
  USER_AUCTION_SUCCESS,
  USER_AUCTION_FAIL,
  USER_ACTIVE_AUCTION_REQ,
  USER_ACTIVE_AUCTION_SUCCESS,
  USER_ACTIVE_AUCTION_FAIL,
  USER_COMPLETE_LIST_AUCTION_REQ,
  USER_COMPLETE_LIST_AUCTION_SUCCESS,
  USER_COMPLETE_LIST_AUCTION_FAIL,
  USER_SOLDITEM_REQ,
  USER_SOLDITEM_SUCCESS,
  USER_SOLDITEM_FAIL,
  USER_AUCTION_MESSAGE,
  USER_AUCTION_RESET_MESSAGE,
  USER_DELETE_AUCTION_REQ,
  USER_DELETE_AUCTION_SUCCESS,
  USER_DELETE_AUCTION_FAIL,
  USER_CLOSE_AUCTION_REQ,
  USER_CLOSE_AUCTION_SUCCESS,
  USER_CLOSE_AUCTION_FAIL,
  USER_CONFIRM_BID_REQ,
  USER_CONFIRM_BID_SUCCESS,
  USER_CONFIRM_BID_FAIL,
  ADD_DELIVERY_AUCTION,
  USER_SOLD_ITEM_INFO_REQ,
  USER_SOLD_ITEM_INFO_SUCCESS,
  USER_SOLD_ITEM_INFO_FAIL,

  // USER_UPDATE_BILL_REQ,
  // USER_UPDATE_BILL_SUCCESS,
  // USER_UPDATE_BILL_FAIL,
  CUSTOMER_PAYMENT_DETAILS_REQ,
  CUSTOMER_PAYMENT_DETAILS_SUCCESS,
  CUSTOMER_PAYMENT_DETAILS_FAIL,
  USER_CSTMR_SHIPPING_DETAILS_REQ,
  USER_CSTMR_SHIPPING_DETAILS_SUCCESS,
  USER_CSTMR_SHIPPING_DETAILS_FAIL,
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
      return { loading: true, details: {} };
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
  state = { loading: false, description: { images: [] } },
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
      return { ...state, ...action.payload, success: null };

    default:
      return state;
  }
};

export const userCreateNewAuction = (
  state = {
    loading: false,
    steps: {
      step1: false,
      step2: false,
      step3: false,
    },
  },
  action
) => {
  switch (action.type) {
    case USER_CREATE_AUCTION_REQ:
      return {
        ...state,
        ...action.payload,
      };
    case USER_CREATE_AUCTION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        // ...action.payload,
      };
    case USER_CREATE_AUCTION_FAIL:
      return { ...state, ...action.payload };
    case USER_CREATE_AUCTION_RESET:
      return {
        loading: false,
      };
    case ADD_CATEGORY_AUCTION:
      return {
        ...state,
        steps: { ...state.steps, step1: true },
        category: action.payload,
      };
    case ADD_DESC_AUCTION:
      return {
        ...state,
        steps: { ...state.steps, step1: true, step2: true },
        description: action.payload,
      };
    case ADD_TIME_PRICE_AUCTION:
      return {
        ...state,
        steps: {
          step1: true,
          step2: true,
          step3: true,
        },
        regular: action.payload,
      };
    case ADD_DELIVERY_AUCTION: {
      return {
        ...state,
        steps: {
          step1: true,
          step2: true,
          step3: true,
          step4: true,
        },
        delivery: action.payload,
      };
    }
    default:
      return state;
  }
};

const userActionInitState = {
  planning: {
    loading: false,
    data: [],
    error: null,
  },
  active: {
    loading: false,
    data: [],
    error: null,
  },
};

export const userAuctionReducer = (state = userActionInitState, action) => {
  switch (action.type) {
    case USER_AUCTION_REQ:
      return {
        ...state,
        planning: action.payload,
      };
    case USER_AUCTION_SUCCESS:
      return {
        ...state,
        planning: action.payload,
      };
    case USER_AUCTION_FAIL:
      return {
        ...state,
        planning: action.payload,
      };
    case USER_ACTIVE_AUCTION_REQ:
      return {
        ...state,
        active: action.payload,
      };
    case USER_ACTIVE_AUCTION_SUCCESS:
      return {
        ...state,
        active: action.payload,
      };
    case USER_ACTIVE_AUCTION_FAIL:
      return {
        ...state,
        active: action.payload,
      };
    case USER_COMPLETE_LIST_AUCTION_REQ:
      return {
        ...state,
        completeList: action.payload,
      };
    case USER_COMPLETE_LIST_AUCTION_SUCCESS:
      return {
        ...state,
        completeList: action.payload,
      };
    case USER_COMPLETE_LIST_AUCTION_FAIL:
      return {
        ...state,
        completeList: action.payload,
      };
    case USER_SOLDITEM_REQ:
      return {
        ...state,
        soldItems: action.payload,
      };
    case USER_SOLDITEM_SUCCESS:
      return {
        ...state,
        soldItems: action.payload,
      };
    case USER_SOLDITEM_FAIL:
      return {
        ...state,
        soldItems: action.payload,
      };
    case USER_AUCTION_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case USER_AUCTION_RESET_MESSAGE: {
      return {
        ...state,
        message: null,
      };
    }
    default:
      return state;
  }
};
export const userUpdateAuctionReducer = (
  state = {
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case USER_UPDATE_AUCTION_REQ:
      return {
        loading: true,
      };
    case USER_UPDATE_AUCTION_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case USER_UPDATE_AUCTION_FAIL:
      return {
        ...action.payload,
      };
    case USER_UPDATE_AUCTION_FAIL:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const auctionDetailsInit = {
  loading: true,
  auction: null,
};

export const userAuctionDetailsReducer = (
  state = auctionDetailsInit,
  action
) => {
  switch (action.type) {
    case USER_AUCTION_DETAILS_REQ:
      return {
        ...state,
        loading: true,
      };

    case USER_AUCTION_DETAILS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case USER_AUCTION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_AUCTION_DETAILS_RESET:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

export const userDeleteAuctionReducer = (
  state = {
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case USER_DELETE_AUCTION_REQ:
      return {
        loading: true,
      };
    case USER_DELETE_AUCTION_SUCCESS:
      return {
        loading: false,
        // success: action.payload,
      };
    case USER_DELETE_AUCTION_FAIL:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export const userCloseAuctionReducer = (
  state = {
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case USER_CLOSE_AUCTION_REQ:
      return {
        loading: true,
      };
    case USER_CLOSE_AUCTION_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case USER_CLOSE_AUCTION_FAIL:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export const userConfirmBidReducer = (
  state = {
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case USER_CONFIRM_BID_REQ:
      return {
        loading: true,
      };
    case USER_CONFIRM_BID_SUCCESS:
      return {
        loading: false,
        // success: action.payload,
      };
    case USER_CONFIRM_BID_FAIL:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export const userSoldItemDetailsReducer = (
  state = {
    loading: false,
    details: null,
  },
  action
) => {
  switch (action.type) {
    case USER_SOLD_ITEM_INFO_REQ:
      return {
        loading: true,
      };
    case USER_SOLD_ITEM_INFO_SUCCESS:
      return {
        ...action.payload,
      };
    case USER_SOLD_ITEM_INFO_FAIL:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export const customerPaymentDetailsDetailsReducer = (
  state = {
    loading: false,
    invoice: null,
  },
  action
) => {
  switch (action.type) {
    case CUSTOMER_PAYMENT_DETAILS_REQ:
      return {
        loading: true,
      };
    case CUSTOMER_PAYMENT_DETAILS_SUCCESS:
      return {
        ...action.payload,
      };
    case CUSTOMER_PAYMENT_DETAILS_FAIL:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export const customerShippingDetailsReducer = (
  state = {
    loading: false,
    shippingDetails: null,
  },
  action
) => {
  switch (action.type) {
    case USER_CSTMR_SHIPPING_DETAILS_REQ:
      return {
        loading: true,
        shippingDetails: null,
      };
    case USER_CSTMR_SHIPPING_DETAILS_SUCCESS:
      return {
        ...action.payload,
      };
    case USER_CSTMR_SHIPPING_DETAILS_FAIL:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

// export const userUpdateBillReducer = (
//   state = {
//     loading: false,
//   },
//   action
// ) => {
//   switch (action.type) {
//     case USER_UPDATE_BILL_REQ:
//       return {
//         loading: true,
//       };
//     case USER_UPDATE_BILL_SUCCESS:
//       return {
//         loading: false,
//       };
//     case USER_UPDATE_BILL_FAIL:
//       return {
//         ...action.payload,
//       };
//     default:
//       return state;
//   }
// };
