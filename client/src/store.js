import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer } from "./reducers/product.reducer";
import {
  authLoginReducer,
  authRegisterReducer,
  authUserReducer,
} from "./reducers/auth.reducer";
import { userInfoFromStorage } from "./utils/auth";
import { menuReducer } from "./reducers/menu.reducer";
import {
  userAuctionReducer,
  userCreateNewAuction,
  userDetailsReducer,
  userUpdateProfileReducer,
  userPostStartAuctionReducer,
} from "./reducers/user.reducer";
import { categoriesReducer } from "./reducers/categories.reducer";

const reducer = combineReducers({
  productList: productListReducer,
  authLogin: authLoginReducer,
  authRegister: authRegisterReducer,
  authUser: authUserReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userAuction: userAuctionReducer,
  userCreateAuction: userCreateNewAuction,
  // userSetStartAuction: userPostStartAuctionReducer,
  menu: menuReducer,
  categories: categoriesReducer,
});

const initialState = {
  authUser: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;