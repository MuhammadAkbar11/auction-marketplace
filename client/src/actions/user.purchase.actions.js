import axios from "axios";
import {
  USER_MYBIDS_REQ,
  USER_MYBIDS_SUCCESS,
  USER_MYBIDS_FAIL,
  USER_PURCHASE_MESSAGE,
  USER_PURCHASE_RESET_MESSAGE,
  USER_WINAUCTION_REQ,
  USER_WINAUCTION_SUCCESS,
  USER_WINAUCTION_FAIL,
  USER_WIN_CONFIRM_REQ,
  USER_WIN_CONFIRM_SUCCESS,
  USER_WIN_CONFIRM_FAIL,
  USER_GET_PAYMENT_REQ,
  USER_GET_PAYMENT_SUCCESS,
  USER_GET_PAYMENT_FAIL,
  USER_POST_PAYMENT_REQ,
  USER_POST_PAYMENT_SUCCESS,
  USER_POST_PAYMENT_FAIL,
  USER_TRACK_SHIPPING_REQ,
  USER_TRACK_SHIPPING_SUCCESS,
  USER_TRACK_SHIPPING_FAIL,
} from "../constants/user.contanst";
import { transformErrorResponse } from "../utils/errors";

export const userResetPurchaseMessage = () => dispatch => {
  dispatch({
    type: USER_PURCHASE_RESET_MESSAGE,
  });
};

export const getUserBidsAction = () => async (dispatch, getState) => {
  const {
    authUser: { userInfo },
  } = getState();

  dispatch({
    type: USER_MYBIDS_REQ,
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

    const { data } = await axios.get("/api/user/mybids", config);
    dispatch({
      type: USER_MYBIDS_SUCCESS,
      payload: {
        loading: false,
        data: data.myBids,
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
      type: USER_MYBIDS_FAIL,
      payload: {
        error: errData,
        loading: false,
      },
    });
  }
};

export const getUserWinningAuctionAction = () => async (dispatch, getState) => {
  const {
    authUser: { userInfo },
  } = getState();

  dispatch({
    type: USER_WINAUCTION_REQ,
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

    const { data } = await axios.get("/api/user/winning-auction", config);

    dispatch({
      type: USER_WINAUCTION_SUCCESS,
      payload: {
        loading: false,
        auctions: data.lelang,
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
      type: USER_WINAUCTION_FAIL,
      payload: {
        error: errData,
        loading: false,
      },
    });
  }
};

export const getUserWinningAuctionDetailsAction =
  invoiceId => async (dispatch, getState) => {
    const {
      authUser: { userInfo },
    } = getState();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        "/api/user/winning-auction/" + invoiceId,
        config
      );

      return data;
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

      return errData;
    }
  };

export const postUserWinConfirmAction =
  values => async (dispatch, getState) => {
    const {
      authUser: { userInfo },
    } = getState();

    dispatch({
      type: USER_WIN_CONFIRM_REQ,
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

      const provinsi = await axios.get(
        "https://dev.farizdotid.com/api/daerahindonesia/provinsi/" +
          values.id_provinsi
      );

      const kota = await axios.get(
        "https://dev.farizdotid.com/api/daerahindonesia/kota/" + values.id_kota
      );

      const kecamatan = await axios.get(
        "https://dev.farizdotid.com/api/daerahindonesia/kecamatan/" +
          values.id_kecamatan
      );
      const kelurahan = await axios.get(
        "https://dev.farizdotid.com/api/daerahindonesia/kelurahan/" +
          values.id_kelurahan
      );

      const postData = {
        id_transaksi: values.id_transaksi,
        alamat_tujuan: {
          provinsi: provinsi?.data?.nama,
          kota: kota?.data?.nama,
          kecamatan: kecamatan?.data?.nama,
          kelurahan: kelurahan?.data?.nama,
          alamat: values.alamat,
          kode_pos: values.kode_pos,
        },
        jenis_pengiriman: values.jenis_pengiriman,
        nama_penerima: values.nama_penerima,
        nohp_penerima: values.nohp_penerima,
        biaya_packing: values.biaya_packing,
      };

      console.log(values);

      const { data } = await axios.post(
        "/api/user/winning-confirm",
        postData,
        config
      );

      // let data = { message: "success" };

      console.log(data, "kon");

      dispatch({
        type: USER_WIN_CONFIRM_SUCCESS,
        payload: {
          loading: false,
          error: null,
        },
      });

      dispatch({
        type: USER_PURCHASE_MESSAGE,
        payload: {
          show: true,
          type: "success",
          text: data?.message,
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
        type: USER_WIN_CONFIRM_FAIL,
        payload: {
          error: errData,
          loading: false,
        },
      });
      dispatch({
        type: USER_PURCHASE_MESSAGE,
        payload: {
          show: true,
          type: "danger",
          text: "Gagal untuk mengkonfirmasi data",
        },
      });
    }
  };

export const getUserPaymentDetailsAction =
  invoiceId => async (dispatch, getState) => {
    dispatch({
      type: USER_GET_PAYMENT_REQ,
    });

    const {
      authUser: { userInfo },
    } = getState();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        "/api/user/payment/" + invoiceId,
        config
      );

      dispatch({
        type: USER_GET_PAYMENT_SUCCESS,
        payload: {
          invoice: data.invoice,
          error: null,
          loading: false,
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
        type: USER_GET_PAYMENT_FAIL,
        payload: {
          error: errData,
        },
      });
    }
  };

export const postPaymentAction = values => async (dispatch, getState) => {
  const {
    authUser: { userInfo },
  } = getState();

  dispatch({
    type: USER_POST_PAYMENT_REQ,
  });

  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    let postData = new FormData();

    // Object.keys(values).forEach(val => {

    postData.append("bank_tujuan", JSON.stringify(values.bank_tujuan));
    postData.append("id_transaksi", values.id_transaksi);
    postData.append("file", values.bukti_bayar.file);
    const { data } = await axios.post("/api/user/payment", postData, config);

    dispatch({
      type: USER_POST_PAYMENT_SUCCESS,
      payload: {
        invoice: data.invoice,
        success: true,
      },
    });

    return data;
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
      type: USER_POST_PAYMENT_FAIL,
      payload: errData,
    });

    return await Promise.reject(errData);
  }
};

export const getUserTrackShippingAction =
  invoiceId => async (dispatch, getState) => {
    dispatch({
      type: USER_TRACK_SHIPPING_REQ,
    });

    const {
      authUser: { userInfo },
    } = getState();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      console.log(invoiceId);
      const { data } = await axios.get(
        "/api/user/track-shipping/" + invoiceId,
        config
      );

      // console.log(de)

      dispatch({
        type: USER_TRACK_SHIPPING_SUCCESS,
        payload: {
          details: data.shipping,
          error: null,
          loading: false,
        },
      });
    } catch (error) {
      let errData = transformErrorResponse(error);

      dispatch({
        type: USER_TRACK_SHIPPING_FAIL,
        payload: {
          error: errData,
        },
      });
    }
  };
