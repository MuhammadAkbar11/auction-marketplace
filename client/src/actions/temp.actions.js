import {
  TEMP_REQUEST,
  TEMP_SUCCESS,
  TEMP_FAIL,
} from "../constants/temp.constants";

export const tempAction = () => async (dispatch, getState) => {
  const {
    authUser: { userInfo },
  } = getState();

  dispatch({
    type: TEMP_REQUEST,
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

    const { data } = await axios.get("/api/?", config);
    dispatch({
      type: TEMP_SUCCESS,
      payload: {
        loading: false,
        data: data.lelang,
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
      type: TEMP_FAIL,
      payload: {
        error: errData,
        loading: false,
      },
    });
  }
};
