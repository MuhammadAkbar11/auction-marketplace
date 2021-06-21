import axios from "axios";
import { AUTH_SET_USER } from "../constants/auth.constants";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  // USER_UPDATE_PROFILE_RESET,
  // USER_CHANGE_PASSWORD_REQUEST,
  // USER_CHANGE_PASSWORD_SUCCESS,
  // USER_CHANGE_PASSWORD_FAIL,
  // USER_CHANGE_PASSWORD_RESET,
  ADD_CATEGORY_AUCTION,
  ADD_ADDRESS_AUCTION,
  ADD_DESC_AUCTION,
  ADD_TIME_PRICE_AUCTION,
  USER_CREATE_AUCTION_REQ,
  USER_CREATE_AUCTION_SUCCESS,
  USER_CREATE_AUCTION_FAIL,
  USER_CREATE_AUCTION_RESET,
  USER_AUCTION_REQ,
  USER_AUCTION_SUCCESS,
  USER_AUCTION_FAIL,
  USER_ACTIVE_AUCTION_REQ,
  USER_ACTIVE_AUCTION_SUCCESS,
  USER_ACTIVE_AUCTION_FAIL,
  USER_UPDATE_PROFILE_RESET,
} from "../constants/user.contanst";

import { _dateFormat } from "../utils/date-format";

export const getUserDetailsAction = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
      payload: {
        loading: true,
      },
    });

    const {
      authUser: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/user/profile`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: {
        loading: false,
        details: data.details,
      },
    });
  } catch (error) {
    console.log(error);
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
      type: USER_DETAILS_FAIL,
      payload: {
        loading: false,
        error: errData,
      },
    });
  }
};

export const updateUserProfileAction = values => async (dispatch, getState) => {
  const {
    authUser: { userInfo },
  } = getState();

  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
      payload: {
        success: null,
        loading: true,
      },
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const postUpdate = {
      nama: values.nama,
      username: values.username,
      kode_pos: values.kodePos,
      no_hp: values.noHp,
      no_ktp: values.noKtp,
      tgl_lahir: values.tglLahir,
      alamat: values.alamat,
      id_kecamatan: +values.idKec,
      id_kelurahan: +values.idKelu,
      id_kota: +values.idKota,
      id_provinsi: +values.idProvinsi,
    };

    const { data } = await axios.put(
      `/api/user/update-profile`,
      postUpdate,
      config
    );

    const updatedUser = await axios.get(`/api/user/profile`, config);
    const userDetails = updatedUser.data.details;
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: {
        loading: false,
        details: userDetails,
      },
    });

    const authUser = {
      id_member: userInfo.id_member,
      token: userInfo.token,
      nama: userDetails.nama,
      email: userDetails.email,
      no_hp: userDetails.no_hp,
      role: userDetails.role,
      tgl_dibuat: userDetails.tgl_dibuat,
      tgl_diubah: userDetails.tgl_dibuat,
    };

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: {
        success: {
          message: data.message,
        },
        loading: false,
      },
    });

    dispatch({
      type: AUTH_SET_USER,
      payload: authUser,
    });

    localStorage.setItem("baebid_userInfo", JSON.stringify(authUser));
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
      type: USER_UPDATE_PROFILE_FAIL,
      payload: {
        error: errData,
        loading: false,
      },
    });
  }
};

export const userResetUpdateProfile = type => dispatch => {
  dispatch({
    type: USER_UPDATE_PROFILE_RESET,
  });
};

export const userProfileError = (type, error) => dispatch => {
  dispatch({
    type: type,
    payload: {
      error: error,
      loading: false,
    },
  });
};

export const userAddAuctionRegularData = value => dispatch => {
  // const { userCreateAuction } = getState();
  dispatch({
    type: ADD_TIME_PRICE_AUCTION,
    payload: value,
  });
};
export const userAddAuctionCategory = value => dispatch => {
  // const { userCreateAuction } = getState();
  dispatch({
    type: ADD_CATEGORY_AUCTION,
    payload: +value,
  });
};

export const userAddAuctionDesc = value => dispatch => {
  // const { userCreateAuction } = getState();
  dispatch({
    type: ADD_DESC_AUCTION,
    payload: value,
  });
};

export const postUserCreateAuctionAction =
  values => async (dispatch, getState) => {
    const {
      authUser: { userInfo },
      userCreateAuction,
    } = getState();

    dispatch({
      type: ADD_TIME_PRICE_AUCTION,
      payload: values,
    });

    dispatch({
      type: USER_CREATE_AUCTION_REQ,
    });

    const { steps, category, description } = userCreateAuction;

    const dateStart = new Date(values.dateStart);
    let dateEnd = new Date();
    dateEnd.setDate(dateStart.getDate() + +values.duration);
    try {
      if (steps.step1 && steps.step2) {
        const auction = {
          judul: description.title,
          status_brg: description.status,
          hrg_awal: values.openBid,
          kelipatan_hrg: values.multiples,
          id_kategori: +category,
          batas_tawaran: values.maxBid,
          deskripsi: description.description,
          tgl_mulai: `${_dateFormat(dateStart, "strip")} ${values.timeStart}`,
          tgl_selesai: `${_dateFormat(dateEnd, "strip")} ${values.timeStart}`,
        };

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        let postData = new FormData();
        Object.keys(auction).forEach(ac => {
          postData.append(ac, auction[ac]);
        });
        description.images.forEach(img => {
          postData.append("files", img.file);
        });

        const { data } = await axios.post(
          `/api/user/auction/create`,
          postData,
          config
        );
        dispatch({
          type: USER_CREATE_AUCTION_SUCCESS,
        });
      } else {
        throw new Error("Pengisian data belum lengkap");
      }
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
        type: USER_CREATE_AUCTION_FAIL,
        payload: {
          error: errData,
          loading: false,
        },
      });
    }
  };

export const userResetCreateAuction = () => dispatch => {
  dispatch({
    type: USER_CREATE_AUCTION_RESET,
  });
};

export const getUserAuctionAction = () => async (dispatch, getState) => {
  const {
    authUser: { userInfo },
  } = getState();

  dispatch({
    type: USER_AUCTION_REQ,
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

    const { data } = await axios.get(
      "/api/user/auction?status=planning",
      config
    );

    dispatch({
      type: USER_AUCTION_SUCCESS,
      payload: {
        loading: false,
        data: data.lelang,
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
      type: USER_AUCTION_FAIL,
      payload: {
        error: errData,
        loading: false,
      },
    });
  }
};

export const getUserAuctionsActiveAction = () => async (dispatch, getState) => {
  const {
    authUser: { userInfo },
  } = getState();

  dispatch({
    type: USER_ACTIVE_AUCTION_REQ,
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

    const { data } = await axios.get("/api/user/auction?status=active", config);
    console.log(data, "data <=");
    dispatch({
      type: USER_ACTIVE_AUCTION_SUCCESS,
      payload: {
        loading: false,
        data: data.lelang,
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
      type: USER_ACTIVE_AUCTION_FAIL,
      payload: {
        error: errData,
        loading: false,
      },
    });
  }
};
