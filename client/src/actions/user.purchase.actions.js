import axios from "axios";
import {
  USER_MYBIDS_REQ,
  USER_MYBIDS_SUCCESS,
  USER_MYBIDS_FAIL,
} from "../constants/user.contanst";

export const getUserBidsAction = () => async (dispatch, getState) => {
  const {
    authUser: { userInfo },
  } = getState();

  dispatch({
    type: USER_MYBIDS_REQ,
    payload: {
      loading: true,
    },
  });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/user/mybids", config);
    dispatch({
      type: USER_MYBIDS_SUCCESS,
      payload: {
        loading: false,
        data: data.myBids,
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
      type: USER_MYBIDS_FAIL,
      payload: {
        error: errData,
        loading: false,
      },
    });
  }
};
