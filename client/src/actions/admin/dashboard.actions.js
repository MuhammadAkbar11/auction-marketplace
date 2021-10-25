import axios from "axios";
import {
  ADMIN_DASHBOARD_GET,
  ADMIN_DASHBOARD_SUCCESS,
} from "../../constants/admin/admin.constants";
import { ADMIN_LOGIN_FAIL } from "../../constants/admin/auth.constant";
import { transformErrorResponse } from "../../utils/errors";
import { authAdminLogoutAuction } from "./auth.actions";

export const adminGetDashboardDataAction = () => async (dispatch, getState) => {
  dispatch({
    type: ADMIN_DASHBOARD_GET,
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

    const {
      data: { members },
    } = await axios.get(`/api/admin/members`, config);
    const auctions = await axios.get(`/api/admin/auctions`, config);
    const latestAuctions = await axios.get(
      `/api/admin/auctions?filter=active`,
      config
    );
    const invoices = await axios.get(`/api/admin/invoices`, config);

    dispatch({
      type: ADMIN_DASHBOARD_SUCCESS,
      payload: {
        loading: false,
        members: members,
        auctions: {
          all: auctions.data,
          latest: latestAuctions.data,
        },
        invoices: invoices.data,
      },
    });
  } catch (err) {
    const errRespon = transformErrorResponse(err);

    dispatch({
      type: ADMIN_LOGIN_FAIL,
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

// export const
