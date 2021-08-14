import axios from "axios";
import {
  CATEGORIES_FAIL,
  CATEGORIES_REQUEST,
  CATEGORIES_SUCCESS,
} from "../constants/categories.contants";

export const getCategoriesAction = () => async dispatch => {
  try {
    dispatch({
      type: CATEGORIES_REQUEST,
      payload: {
        loading: true,
      },
    });

    const { data } = await axios.get(`/api/categories`);

    dispatch({
      type: CATEGORIES_SUCCESS,
      payload: data.categories,
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
      type: CATEGORIES_FAIL,
      payload: {
        loading: false,
        error: errData,
      },
    });
  }
};
