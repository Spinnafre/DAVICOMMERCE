import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  ProductListReducer,
  ProductsDetailsReducer,
  ProductRegisterReducer,
  ProductDeleteReducer,
  ProductReviewReducer,
} from "../Reducers/productReducer";
import { CartReducer } from "../Reducers/cartReducer";
import {
  UserReducerSignin,
  UserReducerRegister,
  UserReducerUpdate,
} from "../Reducers/UserReducer";
import {
  DetailOrderReducer,
  MyListReducer,
  OrderDeleteReducer,
  OrderListReducer,
  OrderPaymentReducer,
  OrderRegisterReducer,
} from "../Reducers/OrderReducer";

import Cookie from "js-cookie";

const carts = Cookie.getJSON("carts") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {
  addToCart: { carts, shipping: {}, payment: {} },
  UserLogin: { userInfo },
};
// console.log('INITIAL STATE= ',initialState)
// console.log(initialState)
// Aqui irá ficar combinado todas as minhas reducers
const reducer = combineReducers({
  productList: ProductListReducer,
  productsDetails: ProductsDetailsReducer,
  addToCart: CartReducer,
  UserLogin: UserReducerSignin,
  UserRegister: UserReducerRegister,
  UserUpdate: UserReducerUpdate,
  ProductRegister: ProductRegisterReducer,
  ProductDelete: ProductDeleteReducer,
  ProductReviews: ProductReviewReducer,

  MyOrderList:MyListReducer,
  OrderList:OrderListReducer,
  DetailOrder:DetailOrderReducer,
  PayOrder:OrderPaymentReducer,
  OrderRegister:OrderRegisterReducer,
  OrderDelete:OrderDeleteReducer

});
const composeEnnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Para trabalhar com assíncrono no REDUX, eu utilizo o THUNK ou REDUX-SAGA
// console.log(carts)
const store = createStore(
  reducer,
  initialState,
  composeEnnhancer(applyMiddleware(thunk))
);

export default store;
