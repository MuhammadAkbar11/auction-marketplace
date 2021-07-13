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
} from "./reducers/user.reducer";
import { categoriesReducer } from "./reducers/categories.reducer";
import {
  AuctionDetailsReducer,
  auctionListReducer,
  auctionsLatestReducer,
} from "./reducers/auctions.reducer";
import {
  adminLoginReducer,
  authAdminReducer,
} from "./reducers/admin/adminAuth.reducer";
import { adminCategoriesReducer } from "./reducers/admin/adminCategories.reducer";
import { userMyBidsReducer } from "./reducers/user.purchase.reducer";

const reducer = combineReducers({
  adminLogin: adminLoginReducer,
  adminAuth: authAdminReducer,
  adminCategories: adminCategoriesReducer,
  productList: productListReducer,
  auctionDetails: AuctionDetailsReducer,
  auctionsLatest: auctionsLatestReducer,
  auctionList: auctionListReducer,
  authLogin: authLoginReducer,
  authRegister: authRegisterReducer,
  authUser: authUserReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userAuction: userAuctionReducer,
  userAuctionDetails: userAuctionDetailsReducer,
  userCreateAuction: userCreateNewAuction,
  userUpdateAuction: userUpdateAuctionReducer,
  userDeleteAuction: userDeleteAuctionReducer,
  userCloseAuction: userCloseAuctionReducer,
  userMyBids: userMyBidsReducer,
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
