import axios from "axios";
import {
  AUCTION_DETAIL_REQ,
  AUCTION_DETAIL_SUCCESS,
  AUCTION_DETAIL_FAIL,
  AUCTION_LATEST_REQ,
  AUCTION_LATEST_SUCCESS,
  AUCTION_LATEST_FAIL,
  AUCTION_LIST_REQ,
  AUCTION_LIST_SUCCESS,
  AUCTION_LIST_FAIL,
  AUCTION_BY_CATEGORY_REQ,
  AUCTION_BY_CATEGORY_SUCCESS,
  AUCTION_BY_CATEGORY_FAIL,
} from "../constants/auctions.constants";
import { transformErrorResponse } from "../utils/errors";

export const getAuctionDetailsAction = idAuction => async dispatch => {
  dispatch({
    type: AUCTION_DETAIL_REQ,
    payload: {
      loading: true,
    },
  });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("/api/auction/" + idAuction, config);
    dispatch({
      type: AUCTION_DETAIL_SUCCESS,
      payload: {
        loading: false,
        auction: data.lelang,
        error: null,
      },
    });
  } catch (error) {
    let errData = {
      message: error.message,
    };

    if (error.response && error.response.data.message) {
      const errorData =
        error.response.data.errors && error.response.data.errors;
      errData = {
        message: error.response.data.message,
        ...errorData,
      };
    }

    dispatch({
      type: AUCTION_DETAIL_FAIL,
      payload: {
        error: errData,
        loading: false,
      },
    });
  }
};

export const getSliderLatestAuctionAction = variables => async () => {
  try {
    const { data } = await axios.post("/api/auction", variables);
    return data.lelang;
  } catch (error) {
    let errData = {
      message: error.message,
    };

    if (error.response && error.response.data.message) {
      const errorData =
        error.response.data.errors && error.response.data.errors;
      errData = {
        message: error.response.data.message,
        ...errorData,
      };
    }

    throw errData;
  }
};

export const getLatestAuctionAction =
  (isLoadMore = false, variables) =>
  async (dispatch, getState) => {
    dispatch({
      type: AUCTION_LATEST_REQ,
    });
    try {
      const {
        auctionsLatest: { auctions },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post("/api/auction", variables, config);
      let auctionList = [];

      if (isLoadMore) {
        auctionList = [...auctions, ...data.lelang];
      } else {
        auctionList = data.lelang;
      }

      dispatch({
        type: AUCTION_LATEST_SUCCESS,
        payload: {
          loading: false,
          loadingMore: false,
          auctions: auctionList,
          totalItem: data.totalItem,
          category: data.kategori,
          totalShowing: auctionList.length,
          filter: variables?.filter,
          skip: variables?.skip,
          order: variables?.order,
          sort: variables?.sort,
          result: variables?.result,
        },
      });
    } catch (error) {
      let errData = {
        message: error.message,
      };

      if (error.response && error.response.data.message) {
        const errorData =
          error.response.data.errors && error.response.data.errors;
        errData = {
          message: error.response.data.message,
          ...errorData,
        };
      }

      dispatch({
        type: AUCTION_LATEST_FAIL,
        payload: {
          error: errData,
          loading: false,
        },
      });
    }
  };

export const getListAuctionAction =
  (isLoadMore = false, variables) =>
  async (dispatch, getState) => {
    dispatch({
      type: AUCTION_LIST_REQ,
      payload: {
        loading: !isLoadMore ? true : false,
        loadingMore: isLoadMore,
      },
    });

    try {
      const {
        auctionList: { auctions },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post("/api/auction", variables, config);
      let auctionList = [];

      if (isLoadMore) {
        auctionList = [...auctions, ...data.lelang];
      } else {
        auctionList = data.lelang;
      }

      dispatch({
        type: AUCTION_LIST_SUCCESS,
        payload: {
          loading: false,
          loadingMore: false,
          auctions: auctionList,
          totalItem: data.totalItem,
          totalShowing: auctionList.length,
          categoryId: variables?.categoryId,
          skip: variables?.skip,
          order: variables?.order,
          sort: variables?.sort,
          filter: variables?.filter,
          result: variables?.result,
        },
      });
      console.log(data);
    } catch (error) {
      let errData = {
        message: error.message,
      };

      if (error.response && error.response.data.message) {
        const errorData =
          error.response.data.errors && error.response.data.errors;
        errData = {
          message: error.response.data.message,
          ...errorData,
        };
      }

      dispatch({
        type: AUCTION_LIST_FAIL,
        payload: {
          error: errData,
          loading: false,
        },
      });
    }
  };

export const getListAuctionByCategoryAction =
  (isLoadMore = false, variables) =>
  async (dispatch, getState) => {
    dispatch({
      type: AUCTION_BY_CATEGORY_REQ,
      payload: {
        loading: !isLoadMore ? true : false,
        loadingMore: isLoadMore,
      },
    });

    try {
      const {
        auctionListByCategory: { auctions },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post("/api/auction", variables, config);
      let auctionList = [];

      if (isLoadMore) {
        auctionList = [...auctions, ...data.lelang];
      } else {
        auctionList = data.lelang;
      }

      dispatch({
        type: AUCTION_BY_CATEGORY_SUCCESS,
        payload: {
          loading: false,
          loadingMore: false,
          auctions: auctionList,
          totalItem: data.totalItem,
          category: data.kategori,
          totalShowing: auctionList.length,
          filter: variables?.filter,
          skip: variables?.skip,
          order: variables?.order,
          sort: variables?.sort,
          result: variables?.result,
        },
      });
    } catch (error) {
      const errData = transformErrorResponse(error);

      dispatch({
        type: AUCTION_BY_CATEGORY_FAIL,
        payload: {
          error: errData,
          loadingMore: false,
          loading: false,
        },
      });
    }
  };
