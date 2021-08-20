import {
  AUCTION_DETAIL_REQ,
  AUCTION_DETAIL_SUCCESS,
  AUCTION_DETAIL_FAIL,
  AUCTION_DETAIL_RESET,
  AUCTION_LATEST_REQ,
  AUCTION_LATEST_SUCCESS,
  AUCTION_LATEST_FAIL,
  AUCTION_LIST_REQ,
  AUCTION_LIST_SUCCESS,
  AUCTION_LIST_FAIL,
  AUCTION_BY_CATEGORY_REQ,
  AUCTION_BY_CATEGORY_SUCCESS,
  AUCTION_BY_CATEGORY_FAIL,
  // AUCTION_LIST_RESET,
} from "../constants/auctions.constants";
// import auctionsData from "../data/product";

const auctionDetailsInit = {
  loading: true,
  auction: null,
};

export const AuctionDetailsReducer = (state = auctionDetailsInit, action) => {
  switch (action.type) {
    case AUCTION_DETAIL_REQ:
      return {
        ...state,
        loading: true,
      };

    case AUCTION_DETAIL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case AUCTION_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case AUCTION_DETAIL_RESET:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

export const auctionsLatestReducer = (
  state = {
    loading: false,
    loadingMore: false,
    auctions: [],
    categoryId: [],
    category: null,
    order: "ASC",
    filter: "all",
    sort: "_id",
    skip: 0,
    result: 8,
    totalItem: 0,
    totalShowing: 0,
  },
  action
) => {
  switch (action.type) {
    case AUCTION_LATEST_REQ:
      return {
        ...state,
        loading: true,
      };
    case AUCTION_LATEST_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case AUCTION_LATEST_FAIL:
      return {
        ...state,
        loading: false,
        loadingMore: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const auctionListReducer = (
  state = {
    loading: false,
    loadingMore: false,
    auctions: [],
    categoryId: [],
    order: "ASC",
    sort: "_id",
    skip: 0,
    filter: "all",
    result: 8,
    totalItem: 0,
    totalShowing: 0,
  },
  action
) => {
  switch (action.type) {
    case AUCTION_LIST_REQ:
      return {
        ...state,
        ...action.payload,
      };
    case AUCTION_LIST_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case AUCTION_LIST_FAIL:
      return {
        ...state,
        loading: false,
        loadingMore: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const auctionByCategoryReducer = (
  state = {
    loading: false,
    loadingMore: false,
    auctions: [],
    categoryId: [],
    category: null,
    order: "ASC",
    filter: "all",
    sort: "_id",
    skip: 0,
    result: 8,
    totalItem: 0,
    totalShowing: 0,
  },
  action
) => {
  switch (action.type) {
    case AUCTION_BY_CATEGORY_REQ:
      return {
        ...state,
        ...action.payload,
      };
    case AUCTION_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case AUCTION_BY_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        loadingMore: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
