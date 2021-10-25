import {
  ADMIN_CATEGORY_REQ,
  ADMIN_CATEGORY_SUCCESS,
  ADMIN_CATEGORY_FAIL,
  ADMIN_CATEGORY_ALERT,
  ADMIN_CATEGORY_RESET_ALERT,
  ADMIN_INVOICES_REQ,
  ADMIN_INVOICES_SUCCESS,
  ADMIN_INVOICES_FAIL,
  ADMIN_INVOICES_ALERT,
  ADMIN_INVOICES_RESET_ALERT,
  ADMIN_DETAILS_INVOICE_SUCCESS,
  ADMIN_DETAILS_INVOICE_REQ,
  ADMIN_DETAILS_INVOICE_FAIL,
} from "../../constants/admin/admin.constants";

const initState = {
  invoices: [],
  alert: null,
};

export const adminInvoicesReducer = (state = initState, action) => {
  switch (action.type) {
    case ADMIN_INVOICES_REQ:
      return {
        ...state,
        loading: true,
        invoices: [],
        error: null,
      };

    case ADMIN_INVOICES_SUCCESS:
      return {
        ...state,
        loading: false,
        invoices: action.payload,
        error: null,
      };

    case ADMIN_INVOICES_FAIL:
      return { ...state, loading: false, error: action.payload };

    case ADMIN_INVOICES_ALERT:
      return {
        ...state,
        loading: false,
        invoices: state.invoices,
        alert: action.payload,
      };
    case ADMIN_INVOICES_RESET_ALERT:
      return {
        loading: false,
        invoices: state.invoices,
        alert: null,
      };
    default:
      return state;
  }
};

export const adminDetailsInvoiceReducer = (
  state = {
    loading: false,
    invoice: null,
  },
  action
) => {
  switch (action.type) {
    case ADMIN_DETAILS_INVOICE_REQ:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADMIN_DETAILS_INVOICE_SUCCESS:
      return {
        loading: false,
        invoice: action.payload,
        error: null,
      };
    case ADMIN_DETAILS_INVOICE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
