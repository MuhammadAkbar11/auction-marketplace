import axios from "axios";
import {
  ADMIN_AUCTIONS_REQ,
  ADMIN_AUCTIONS_SUCCESS,
  ADMIN_AUCTIONS_FAIL,
} from "../../constants/admin/admin.constants";
import { transformErrorResponse } from "../../utils/errors";
import { authAdminLogoutAuction } from "./auth.actions";

export const adminGetListAuctionsAction = () => async (dispatch, getState) => {
  dispatch({
    type: ADMIN_AUCTIONS_REQ,
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

    const { data } = await axios.get(`/api/admin/auctions`, config);

    dispatch({
      type: ADMIN_AUCTIONS_SUCCESS,
      payload: data.auctions,
    });
  } catch (err) {
    const errRespon = transformErrorResponse(err);

    dispatch({
      type: ADMIN_AUCTIONS_FAIL,
      payload: errRespon,
    });

    const notAuth = errRespon?.notAuth;
    if (notAuth) {
      dispatch(authAdminLogoutAuction());
    }
  }
};
