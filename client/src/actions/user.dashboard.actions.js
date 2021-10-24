import axios from "axios";
import {
  USER_DB_AUCTIONS_FAIL,
  USER_DB_AUCTIONS_REQ,
  USER_DB_AUCTIONS_SUCCESS,
} from "../constants/user.contanst";
import { axiosConfigAuth } from "../utils/axiosConfig";
import { transformErrorResponse } from "../utils/errors";
import { authLogoutAuction } from "./auth.actions";

export const getUserDashAuctions = () => async (dispatch, getState) => {
  const {
    authUser: { userInfo },
  } = getState();

  dispatch({
    type: USER_DB_AUCTIONS_REQ,
    payload: {
      loading: true,
    },
  });

  try {
    const config = axiosConfigAuth(userInfo.token);
    const { data } = await axios.get("/api/user/dashboard/auctions", config);

    dispatch({
      type: USER_DB_AUCTIONS_SUCCESS,
      payload: {
        loading: false,
        auctions: { ...data },
      },
    });
  } catch (error) {
    const errRes = transformErrorResponse(error);

    dispatch({
      type: USER_DB_AUCTIONS_FAIL,
      payload: {
        ...errRes,
      },
    });

    const notAuth = errRes?.notAuth;
    if (notAuth) {
      dispatch(authLogoutAuction());
    }
  }
};
