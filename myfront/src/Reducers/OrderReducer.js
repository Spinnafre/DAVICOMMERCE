import {
  ORDER_SAVE_FAIL,
  ORDER_SAVE_REQUEST,
  ORDER_SAVE_SUCESS,
  ORDER_DELETE_SUCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCESS,
  MY_ORDER_LIST_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCESS,
  PAY_FAIL,
  PAY_REQUEST,
  PAY_SUCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCESS,
} from "../constants/OrderConstants";

// MyList irá receber as informações da lista de encomendas do Usuário
function MyListReducer(state = { myOrder: [] }, action) {
  switch (action.type) {
    case MY_ORDER_LIST_REQUEST:
      return { loading: true };
    case MY_ORDER_LIST_SUCESS:
      return { loading: false, myOrder: action.payload };
    case MY_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
// Passando o Order (Conteúdo da tabela User + Conteúdo da tabela Order)
function OrderListReducer(state = { orders: [] }, action) {
  // console.log("STATE= ",state)
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCESS:
      return { loading: false, orders: action.payload, success: true };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
}
function DetailOrderReducer(
  state = { order: { cartItems: [], shipping: {}, payment: {} } },
  action
) {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return { loading: true };
    case ORDER_DETAIL_SUCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
function OrderRegisterReducer(state = {}, action) {
  switch (action.type) {
    case ORDER_SAVE_REQUEST:
      return { loading: true };
    case ORDER_SAVE_SUCESS:
      return { loading: false, sucess: true, order: action.payload };
    case ORDER_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
function OrderDeleteReducer(
  state = { order: { cartItems: [], shipping: {}, payment: {} } },
  action
) {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true };
    case ORDER_DELETE_SUCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function OrderPaymentReducer(
  state = { order: { cartItems: [], shipping: {}, payment: {} } },
  action
) {
  switch (action.type) {
    case PAY_REQUEST:
      return { loading: true };
    case PAY_SUCESS:
      return { loading: false, success: true, order: action.payload };
    case PAY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  MyListReducer,
  OrderDeleteReducer,
  OrderListReducer,
  OrderPaymentReducer,
  OrderRegisterReducer,
  DetailOrderReducer,
};
