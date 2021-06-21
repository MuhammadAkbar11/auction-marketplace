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
      return { ...state, ...action.payload };

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
    default:
      return state;
  }
};
// export const userPostStartAuctionReducer = (
//   state = {
//     loading: false,
//   },
//   action
// ) => {
//   switch (action.type) {
//     case USER_START_AUCTION_REQ:
//       return {
//         loading: false,
//       };
//     case USER_START_AUCTION_SUCCESS:
//       return {
//         loading: false,
//         success: action.payload,
//       };
//     case USER_START_AUCTION_FAIL:
//       return {
//         ...action.payload,
//       };
//     default:
//       return state;
//   }
// };
