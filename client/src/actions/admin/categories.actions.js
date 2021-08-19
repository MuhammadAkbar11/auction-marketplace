import axios from "axios";
import {
  ADMIN_CATEGORY_ALERT,
  ADMIN_CATEGORY_RESET_ALERT,
  ADMIN_CATEGORY_REQ,
  ADMIN_CATEGORY_SUCCESS,
  ADMIN_CATEGORY_FAIL,
} from "../../constants/admin/admin.constants";
import { transformErrorResponse } from "../../utils/errors";
import { authAdminLogoutAuction } from "./auth.actions";

export const adminGetCategoriesAction =
  values => async (dispatch, getState) => {
    dispatch({
      type: ADMIN_CATEGORY_REQ,
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

      const { data } = await axios.get(`/api/admin/kategori`, config);

      dispatch({
        type: ADMIN_CATEGORY_SUCCESS,
        payload: data.categories,
      });
    } catch (err) {
      const errRespon = transformErrorResponse(err);

      dispatch({
        type: ADMIN_CATEGORY_FAIL,
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

export const adminPostCategoryAction =
  (values, isEdit = false) =>
  async (dispatch, getState) => {
    const {
      adminAuth: { adminInfo },
    } = getState();

    dispatch({
      type: ADMIN_CATEGORY_RESET_ALERT,
    });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/admin/kategori`,
        {
          id_kategori: values?.id_kategori,
          slug: values?.slug,
          kategori: values?.category,
          isEdit,
        },
        config
      );

      dispatch({
        type: ADMIN_CATEGORY_ALERT,
        payload: {
          show: true,
          type: "success",
          message: data.message,
        },
      });
    } catch (err) {
      const errRespon = transformErrorResponse(err);

      dispatch({
        type: ADMIN_CATEGORY_ALERT,
        payload: {
          show: true,
          type: "danger",
          message: errRespon.message,
        },
      });
      // console.log(errRespon);
      const notAuth = errRespon?.notAuth;
      if (notAuth) {
        dispatch(authAdminLogoutAuction());
      }
    }
  };

export const adminDeleteCategoryAction = id => async (dispatch, getState) => {
  const {
    adminAuth: { adminInfo },
  } = getState();

  dispatch({
    type: ADMIN_CATEGORY_RESET_ALERT,
  });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/admin/kategori/${id}`, config);

    dispatch({
      type: ADMIN_CATEGORY_ALERT,
      payload: {
        show: true,
        type: "success",
        message: data.message,
      },
    });
  } catch (err) {
    const errRespon = transformErrorResponse(err);

    dispatch({
      type: ADMIN_CATEGORY_ALERT,
      payload: {
        show: true,
        type: "danger",
        message: errRespon?.message,
      },
    });

    const notAuth = errRespon?.notAuth;
    if (notAuth) {
      dispatch(authAdminLogoutAuction());
    }
  }
};

export const adminCategoryResetAlertAction = type => dispatch => {
  return dispatch({
    type: ADMIN_CATEGORY_RESET_ALERT,
  });
};
