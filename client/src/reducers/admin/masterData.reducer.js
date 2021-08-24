import {
  ADMIN_MEMBERS_REQ,
  ADMIN_MEMBERS_SUCCESS,
  ADMIN_MEMBERS_FAIL,
  ADMIN_MEMBERS_ALERT,
  ADMIN_MEMBERS_CLEAR_ALERT,
  ADMIN_AUCTIONS_REQ,
  ADMIN_AUCTIONS_SUCCESS,
  ADMIN_AUCTIONS_FAIL,
} from "../../constants/admin/admin.constants";

const membersInitState = {
  members: [],
  loading: false,
};

export const adminMembersReducer = (state = membersInitState, action) => {
  switch (action.type) {
    case ADMIN_MEMBERS_REQ:
      return {
        loading: true,
        members: [],
        errors: null,
      };
    case ADMIN_MEMBERS_SUCCESS:
      return {
        loading: false,
        members: action.payload,
        errors: null,
      };
    case ADMIN_MEMBERS_FAIL:
      return { loading: false, members: [], error: action.payload };

    default:
      return state;
  }
};

export const adminMembersPageAlertReducer = (
  state = {
    show: false,
    type: "success",
    message: "",
  },
  action
) => {
  switch (action.type) {
    case ADMIN_MEMBERS_ALERT:
      return {
        ...action.payload,
      };

    case ADMIN_MEMBERS_CLEAR_ALERT:
      return {
        show: false,
        type: "success",
        message: "",
      };
    default:
      return state;
  }
};

export const adminListAuctionReducer = (
  state = {
    loading: false,
    auctions: [],
  },
  action
) => {
  switch (action.type) {
    case ADMIN_AUCTIONS_REQ:
      return {
        loading: true,
        auctions: [],
        errors: null,
      };
    case ADMIN_AUCTIONS_SUCCESS:
      return {
        loading: false,
        auctions: action.payload,
        errors: null,
      };
    case ADMIN_AUCTIONS_FAIL:
      return { loading: false, auctions: [], error: action.payload };

    default:
      return state;
  }
};
