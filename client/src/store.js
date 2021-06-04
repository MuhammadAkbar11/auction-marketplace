import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer } from "./reducers/product.reducer";
import {
  authLoginReducer,
  authRegisterReducer,
  authUserReducer,
} from "./reducers/auth.reducer";

const userInfoFromStorage = localStorage.getItem("baebid_userInfo")
  ? JSON.parse(localStorage.getItem("baebid_userInfo"))
  : null;

const reducer = combineReducers({
  productList: productListReducer,
  authLogin: authLoginReducer,
  authRegister: authRegisterReducer,
  authUser: authUserReducer,
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
