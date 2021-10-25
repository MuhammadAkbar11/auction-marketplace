import axios from "axios";
import {
  ADMIN_INVOICES_FAIL,
  ADMIN_INVOICES_REQ,
  ADMIN_INVOICES_RESET_ALERT,
  ADMIN_INVOICES_SUCCESS,
} from "../../constants/admin/admin.constants";
import { transformErrorResponse } from "../../utils/errors";
import { authAdminLogoutAuction } from "./auth.actions";

export const adminGetInvoicesAction = () => async (dispatch, getState) => {
  dispatch({
    type: ADMIN_INVOICES_REQ,
    payload: {
      loading: true,
    },
  });

  const {
    adminAuth: { adminInfo },
  } = getState();

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/admin/invoices`, config);

    dispatch({
      type: ADMIN_INVOICES_SUCCESS,
      payload: {
        loading: false,
        ...data,
      },
    });
  } catch (err) {
    const errRespon = transformErrorResponse(err);

    dispatch({
      type: ADMIN_INVOICES_FAIL,
      payload: {
        loading: false,
        error: errRespon,
      },
    });

    const notAuth = errRespon?.notAuth;
    if (notAuth) {
      dispatch(authAdminLogoutAuction());
    }
  }
};

export const adminRestInvoicesAlertAction = () => dispatch => {
  return dispatch({
    type: ADMIN_INVOICES_RESET_ALERT,
  });
};
