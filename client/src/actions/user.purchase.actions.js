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
} from "../constants/user.contanst";

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

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const transformValues = { ...values };

    let postData = new FormData();

    Object.keys(values).forEach(val => {
      postData.append(val, values[val]);
    });

    const { data } = await axios.post("/api/user/payment", {}, config);

    dispatch({
      type: USER_PURCHASE_MESSAGE,
      payload: {
        show: true,
        type: "success",
        text: "Berhasil, Pembayaran anda sedang diproses!",
      },
    });

    return {};
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
