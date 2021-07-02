import {
  // ADMIN_CATEGORY_ALERT,
  ADMIN_CATEGORY_RESET_ALERT,
} from "../../constants/admin/admin.constants";

export const adminCategoryResetAlertAction = type => dispatch => {
  return dispatch({
    type: ADMIN_CATEGORY_RESET_ALERT,
  });
};
