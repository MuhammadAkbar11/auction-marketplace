import axios from "axios";
import {
  ADMIN_MEMBERS_REQ,
  ADMIN_MEMBERS_SUCCESS,
  ADMIN_MEMBERS_FAIL,
  // ADMIN_MEMBERS_ALERT,
  // ADMIN_MEMBERS_CLEAR_ALERT,
} from "../../constants/admin/admin.constants";
import { transformErrorResponse } from "../../utils/errors";
import { authAdminLogoutAuction } from "./auth.actions";

export const adminGetMembersAction = () => async (dispatch, getState) => {
  dispatch({
    type: ADMIN_MEMBERS_REQ,
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

    const { data } = await axios.get(`/api/admin/members`, config);

    dispatch({
      type: ADMIN_MEMBERS_SUCCESS,
      payload: data.members,
    });
  } catch (err) {
    const errRespon = transformErrorResponse(err);

    dispatch({
      type: ADMIN_MEMBERS_FAIL,
      payload: errRespon,
    });

    const notAuth = errRespon?.notAuth;
    if (notAuth) {
      dispatch(authAdminLogoutAuction());
    }
  }
};

// export const
