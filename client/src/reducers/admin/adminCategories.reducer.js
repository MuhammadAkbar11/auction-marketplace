import {
  ADMIN_CATEGORY_REQ,
  ADMIN_CATEGORY_SUCCESS,
  ADMIN_CATEGORY_FAIL,
  ADMIN_CATEGORY_ALERT,
  ADMIN_CATEGORY_RESET_ALERT,
} from "../../constants/admin/admin.constants";

const initState = {
  categories: [],
};

export const adminCategoriesReducer = (state = initState, action) => {
  switch (action.type) {
    case ADMIN_CATEGORY_REQ:
      return {
        loading: true,
        categories: [],
      };

    case ADMIN_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };

    case ADMIN_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };

    case ADMIN_CATEGORY_ALERT:
      return {
        loading: false,
        categories: state.categories,
        alert: action.payload,
      };
    case ADMIN_CATEGORY_RESET_ALERT:
      return {
        loading: false,
        categories: state.categories,
      };
    default:
      return state;
  }
};
