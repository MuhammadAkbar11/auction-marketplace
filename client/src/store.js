import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer } from "./reducers/product.reducer";
import {
  authLoginReducer,
  authRegisterReducer,
  authUserReducer,
} from "./reducers/auth.reducer";
import { adminInfoFromStorage, userInfoFromStorage } from "./utils/auth";
import { menuReducer } from "./reducers/menu.reducer";
import {
  userAuctionReducer,
  userCreateNewAuction,
  userDetailsReducer,
  userUpdateProfileReducer,
  // userPostStartAuctionReducer,
  userUpdateAuctionReducer,
  userAuctionDetailsReducer,
  userCloseAuctionReducer,
  userDeleteAuctionReducer,
  userConfirmBidReducer,
  userSoldItemDetailsReducer,
  customerPaymentDetailsDetailsReducer,
  customerShippingDetailsReducer,
} from "./reducers/user.reducer";
import { categoriesReducer } from "./reducers/categories.reducer";
import {
  auctionByCategoryReducer,
  AuctionDetailsReducer,
  auctionListReducer,
  auctionsLatestReducer,
} from "./reducers/auctions.reducer";
import {
  adminLoginReducer,
  authAdminReducer,
} from "./reducers/admin/adminAuth.reducer";
import { adminCategoriesReducer } from "./reducers/admin/adminCategories.reducer";

import {
  adminMembersReducer,
  adminMembersPageAlertReducer,
  adminListAuctionReducer,
} from "./reducers/admin/masterData.reducer";
import {
  userMyBidsReducer,
  userPaymentDetailsReducer,
  userPostPaymentReducer,
  userWinningAuctionReducer,
  userWinningConfirmReducer,
} from "./reducers/user.purchase.reducer";
import { userDashboardReducer } from "./reducers/user.dashboard.reducer";

const reducer = combineReducers({
  adminLogin: adminLoginReducer,
  adminAuth: authAdminReducer,
  adminCategories: adminCategoriesReducer,
  adminListMember: adminMembersReducer,
  adminListAuction: adminListAuctionReducer,
  adminMembersAlert: adminMembersPageAlertReducer,
  productList: productListReducer,
  auctionDetails: AuctionDetailsReducer,
  auctionsLatest: auctionsLatestReducer,
  auctionList: auctionListReducer,
  auctionListByCategory: auctionByCategoryReducer,
  authLogin: authLoginReducer,
  authRegister: authRegisterReducer,
  authUser: authUserReducer,
  userDashboard: userDashboardReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userAuction: userAuctionReducer,
  userAuctionDetails: userAuctionDetailsReducer,
  userCreateAuction: userCreateNewAuction,
  userUpdateAuction: userUpdateAuctionReducer,
  userDeleteAuction: userDeleteAuctionReducer,
  userCloseAuction: userCloseAuctionReducer,
  userConfirmBid: userConfirmBidReducer,
  customerPaymentDetails: customerPaymentDetailsDetailsReducer,
  customerShippingDetails: customerShippingDetailsReducer,
  userMyBids: userMyBidsReducer,
  userWinsAuction: userWinningAuctionReducer,
  userWinningConfirm: userWinningConfirmReducer,
  userPaymentDetails: userPaymentDetailsReducer,
  userPostPayment: userPostPaymentReducer,
  userSoldItemDetails: userSoldItemDetailsReducer,
  menu: menuReducer,
  categories: categoriesReducer,
});

const initialState = {
  authUser: { userInfo: userInfoFromStorage },
  adminAuth: { adminInfo: adminInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
