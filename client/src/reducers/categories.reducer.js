import {
  CATEGORIES_FAIL,
  CATEGORIES_REQUEST,
  CATEGORIES_SUCCESS,
} from "../constants/categories.contants";

const initState = {
  categories: [],
};

export const categoriesReducer = (state = initState, action) => {
  switch (action.type) {
    case CATEGORIES_REQUEST:
      return {
        loading: true,
        categories: [],
      };

    case CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };

    case CATEGORIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
