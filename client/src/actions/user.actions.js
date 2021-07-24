import axios from "axios";
import { AUTH_SET_USER } from "../constants/auth.constants";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_AUCTION_REQ,
  USER_UPDATE_AUCTION_SUCCESS,
  USER_UPDATE_AUCTION_FAIL,
  USER_UPDATE_AUCTION_RESET,
  USER_AUCTION_DETAILS_REQ,
  USER_AUCTION_DETAILS_SUCCESS,
  USER_AUCTION_DETAILS_FAIL,
  USER_AUCTION_DETAILS_RESET,
  ADD_CATEGORY_AUCTION,
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
  USER_COMPLETE_LIST_AUCTION_REQ,
  USER_COMPLETE_LIST_AUCTION_SUCCESS,
  USER_COMPLETE_LIST_AUCTION_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_AUCTION_MESSAGE,
  USER_AUCTION_RESET_MESSAGE,
  USER_DELETE_AUCTION_REQ,
  USER_DELETE_AUCTION_SUCCESS,
  USER_DELETE_AUCTION_FAIL,
  USER_CLOSE_AUCTION_REQ,
  USER_CLOSE_AUCTION_SUCCESS,
  USER_CLOSE_AUCTION_FAIL,
  USER_CONFIRM_BID_REQ,
  USER_CONFIRM_BID_SUCCESS,
  USER_CONFIRM_BID_FAIL,
  ADD_DELIVERY_AUCTION,
} from "../constants/user.contanst";
import { axiosConfigAuth } from "../utils/axiosConfig";

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

export const userAddAuctionDelivery = values => dispatch => {
  const data = {
    id_provinsi: values.id_provinsi,
    id_kota: values.id_kota,
    id_kecamatan: values.id_kecamatan,
    id_kelurahan: values.id_kelurahan,
    alamat: values.alamat,
    kode_pos: values.kode_pos,
    jenis_pengiriman: values.jenis_pengiriman,
    dimensi_brg: {
      panjang: values.panjang,
      lebar: values.lebar,
      tinggi: values.tinggi,
      berat: values.berat,
    },
    biaya_packing: values.biaya_packing,
  };

  dispatch({
    type: ADD_DELIVERY_AUCTION,
    payload: data,
  });
};

export const postUserCreateAuctionAction =
  values => async (dispatch, getState) => {
    const {
      authUser: { userInfo },
      userCreateAuction,
    } = getState();

    dispatch({
      type: ADD_DELIVERY_AUCTION,
      payload: {
        id_provinsi: values.id_provinsi,
        id_kota: values.id_kota,
        id_kecamatan: values.id_kecamatan,
        id_kelurahan: values.id_kelurahan,
        alamat: values.alamat,
        kode_pos: values.kode_pos,
        jenis_pengiriman: values.jenis_pengiriman,
        dimensi_brg: {
          panjang: values.panjang,
          lebar: values.lebar,
          tinggi: values.tinggi,
          berat: values.berat,
        },
        biaya_packing: values.biaya_packing,
      },
    });

    dispatch({
      type: USER_CREATE_AUCTION_REQ,
      payload: { loading: true },
    });

    const { steps, category, description, regular } = userCreateAuction;

    const dateStart = new Date(regular.dateStart);
    let dateEnd = new Date();
    dateEnd.setDate(dateStart.getDate() + +regular.duration);

    try {
      if (steps.step1 && steps.step2 && steps.step3) {
        const transformedValues = {
          alamat_barang: JSON.stringify({
            id_provinsi: values.id_provinsi,
            id_kota: values.id_kota,
            id_kecamatan: values.id_kecamatan,
            id_kelurahan: values.id_kelurahan,
            alamat: values.alamat,
            kode_pos: values.kode_pos,
          }),
          jenis_pengiriman: JSON.stringify(values.jenis_pengiriman),
          dimensi_brg: JSON.stringify({
            panjang: values.panjang,
            lebar: values.lebar,
            tinggi: values.tinggi,
            berat: values.berat,
          }),
          biaya_packing: values.biaya_packing,
        };

        const auction = {
          judul: description.title,
          status_brg: description.status,
          hrg_awal: regular.openBid,
          kelipatan_hrg: regular.multiples,
          id_kategori: +category,
          batas_tawaran: regular.maxBid,
          deskripsi: description.description,
          tgl_mulai: `${_dateFormat(dateStart, "strip")} ${regular.timeStart}`,
          tgl_selesai: `${_dateFormat(dateEnd, "strip")} ${regular.timeStart}`,
          ...transformedValues,
        };

        console.log(auction);

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

        dispatch({
          type: USER_AUCTION_MESSAGE,
          payload: {
            type: "success",
            text: "Berhasil membuat lelang",
          },
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

export const postUserUpdateAuctionAction =
  values => async (dispatch, getState) => {
    const {
      authUser: { userInfo },
    } = getState();

    dispatch({
      type: USER_UPDATE_AUCTION_REQ,
    });
    console.log(values);
    const dateStart = new Date(values.dateStart);
    let dateEnd = new Date();
    dateEnd.setDate(dateStart.getDate() + +values.duration);
    try {
      const transformedValues = {
        alamat_barang: JSON.stringify({
          id_provinsi: values.id_provinsi,
          id_kota: values.id_kota,
          id_kecamatan: values.id_kecamatan,
          id_kelurahan: values.id_kelurahan,
          alamat: values.alamat,
          kode_pos: values.kode_pos,
        }),
        jenis_pengiriman: JSON.stringify(values.jenis_pengiriman),
        dimensi_brg: JSON.stringify({
          panjang: values.panjang,
          lebar: values.lebar,
          tinggi: values.tinggi,
          berat: values.berat,
        }),
        biaya_packing: values.biaya_packing,
      };

      const auction = {
        id_lelang: values.auctionId,
        judul: values.title,
        status_brg: values.status,
        hrg_awal: values.openBid,
        kelipatan_hrg: values.multiples,
        id_kategori: +values.category,
        batas_tawaran: values.maxBid,
        deskripsi: values.description,
        tgl_mulai: `${_dateFormat(dateStart, "strip")} ${values.timeStart}`,
        tgl_selesai: `${_dateFormat(dateEnd, "strip")} ${values.timeStart}`,
        status_lelang: values.status,
        ...transformedValues,
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

      values.images.forEach(img => {
        postData.append("files", img.file);
      });

      const { data } = await axios.put(
        `/api/user/auction/update`,
        postData,
        config
      );

      dispatch({
        type: USER_UPDATE_AUCTION_SUCCESS,
      });
      dispatch({
        type: USER_AUCTION_MESSAGE,
        payload: {
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
        type: USER_UPDATE_AUCTION_FAIL,
        payload: {
          error: errData,
          loading: false,
        },
      });
    }
  };

export const userAuctionResetMessageAction = () => dispatch => {
  dispatch({
    type: USER_AUCTION_RESET_MESSAGE,
  });
};

export const getUserAuctionDetailsAction =
  idAuction => async (dispatch, getState) => {
    const {
      authUser: { userInfo },
    } = getState();

    dispatch({
      type: USER_AUCTION_DETAILS_REQ,
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
        "/api/user/auction/" + idAuction,
        config
      );
      dispatch({
        type: USER_AUCTION_DETAILS_SUCCESS,
        payload: {
          loading: false,
          auction: data.lelang,
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
        type: USER_AUCTION_DETAILS_FAIL,
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

export const getUserAuctionsCompleteAction =
  () => async (dispatch, getState) => {
    const {
      authUser: { userInfo },
    } = getState();

    dispatch({
      type: USER_COMPLETE_LIST_AUCTION_REQ,
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
        "/api/user/auction?status=complete",
        config
      );
      dispatch({
        type: USER_COMPLETE_LIST_AUCTION_SUCCESS,
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
        type: USER_COMPLETE_LIST_AUCTION_FAIL,
        payload: {
          error: errData,
          loading: false,
        },
      });
    }
  };

export const postUserConfirmBid = values => async (dispatch, getState) => {
  const {
    authUser: { userInfo },
  } = getState();

  dispatch({
    type: USER_CONFIRM_BID_REQ,
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

    await axios.post("/api/user/auction/confirm-bid", { ...values }, config);

    dispatch(getUserAuctionsCompleteAction());

    dispatch({
      type: USER_CONFIRM_BID_SUCCESS,
      payload: {
        loading: false,
        error: null,
      },
    });
    dispatch({
      type: USER_AUCTION_MESSAGE,
      payload: {
        type: "success",
        text: "Berhasil Konfirmasi!",
      },
    });
  } catch (error) {
    let errData = {
      message: error.message,
    };
    console.log(error);

    if (error.response && error.response.data.message) {
      const errorData =
        error.response.data.errors && error.response.data.errors;
      errData = {
        message: error.response.data.message,
        ...errorData,
      };
    }

    dispatch({
      type: USER_CONFIRM_BID_FAIL,
      payload: {
        error: errData,
        loading: false,
      },
    });
    dispatch({
      type: USER_AUCTION_MESSAGE,
      payload: {
        type: "danger",
        text: "Gagal menghapus data!",
      },
    });
  }
};

export const userAuctionDeleteAction = id => async (dispatch, getState) => {
  dispatch({
    type: USER_DELETE_AUCTION_REQ,
  });

  try {
    const {
      authUser: { userInfo },
    } = getState();

    const config = axiosConfigAuth(userInfo.token);

    await axios.delete("/api/user/auction/" + id, config);

    dispatch({
      type: USER_DELETE_AUCTION_SUCCESS,
    });
    dispatch({
      type: USER_AUCTION_MESSAGE,
      payload: {
        type: "success",
        text: "Berhasil menghapus data!",
      },
    });

    // reload plan auction

    const getPlanAuction = await axios.get(
      "/api/user/auction?status=planning",
      config
    );
    console.log(getPlanAuction);
    dispatch({
      type: USER_AUCTION_SUCCESS,
      payload: {
        loading: false,
        data: getPlanAuction?.data?.lelang,
        error: null,
      },
    });

    // reload active auction

    const getActiveAuction = await axios.get(
      "/api/user/auction?status=active",
      config
    );
    dispatch({
      type: USER_ACTIVE_AUCTION_SUCCESS,
      payload: {
        loading: false,
        data: getActiveAuction?.data?.lelang,
        error: null,
      },
    });

    // }, 3000);
  } catch (error) {
    dispatch({
      type: USER_DELETE_AUCTION_FAIL,
    });
    dispatch({
      type: USER_AUCTION_MESSAGE,
      payload: {
        type: "danger",
        text: "Gagal menghapus data!",
      },
    });
  }
};

export const userAuctionCloseAction = id => async (dispatch, getState) => {
  dispatch({
    type: USER_CLOSE_AUCTION_REQ,
  });

  try {
    // const { data } = axios.delete("/api/action/delete/" + id);
    const {
      authUser: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/user/auction/close/" + id, config);

    // setTimeout(() => {
    dispatch({
      type: USER_CLOSE_AUCTION_SUCCESS,
    });
    dispatch({
      type: USER_AUCTION_MESSAGE,
      payload: {
        type: "success",
        text: "Berhasil menutup lelang!",
      },
    });
    // }, 3000);
  } catch (error) {
    dispatch({
      type: USER_CLOSE_AUCTION_FAIL,
    });
    dispatch({
      type: USER_AUCTION_MESSAGE,
      payload: {
        type: "danger",
        text: "Gagal menghapus data!",
      },
    });
  }
};
