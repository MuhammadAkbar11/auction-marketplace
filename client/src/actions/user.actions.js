import axios from "axios";
import { AUTH_SET_USER } from "../constants/auth.constants";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_CHANGE_PASSWORD_FAIL,
  USER_CHANGE_PASSWORD_RESET,
} from "../constants/user.contanst";

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
      type: USER_UPDATE_PROFILE_FAIL,
      payload: {
        error: errData,
        loading: false,
      },
    });
  }
};
