import api from "../api/api";
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

const SaveOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_SAVE_REQUEST });
    const {
        UserLogin: { userInfo },
    } = getState();

    console.log("SaveOrder ACTION PAYLOAD ", order);
    console.log("Token ", userInfo.token);
    // Caso
    const { data } = await api.post("/api/orders/sendOrder", order, {
        headers: {
            Authorization: "Bearer " + userInfo.token,
        },
    });
    console.log("Action Save Order= ",data)

    dispatch({ type: ORDER_SAVE_SUCESS, payload: data });
    // Disparo a action que irá carregar as listas
  } catch (error) {
    dispatch({ type: ORDER_SAVE_FAIL, payload: error.message });
  }
};
const DeleteOrder = (orderID) => async (dispatch, getState) => {
  try {
    const {
      UserLogin: { userInfo },
    } = getState();
    console.log("USER INFO", userInfo);

    dispatch({ type: ORDER_DELETE_REQUEST });

    const { data } = await api.delete(`/api/orders/${orderID}`, {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    // console.log("DATA DELETE",product)
    dispatch({ type: ORDER_DELETE_SUCESS, payload: data, sucess: true });
  } catch (error) {
    dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
  }
};

const ListOrders = () => async (dispatch, getState) => {
  try {
    const {
      UserLogin: { userInfo },
    } = getState();

    console.log("USER INFO", userInfo);

    dispatch({ type: ORDER_LIST_REQUEST });

    const { data } = await api.get("/api/orders", {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    // console.log("DATA DELETE",product)
    dispatch({ type: ORDER_LIST_SUCESS, payload: data.data, sucess: true });
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
  }
};

const ListMyOrders = () => async (dispatch, getState) => {
  try {
    const {
      UserLogin: { userInfo },
    } = getState();

    console.log("USER INFO", userInfo);

    dispatch({ type: MY_ORDER_LIST_REQUEST });

    const { data } = await api.get("/api/orders/my", {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    // console.log("DATA DELETE",product)
    dispatch({ type: MY_ORDER_LIST_SUCESS, payload: data.data, sucess: true });
  } catch (error) {
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
  }
};

const DetailOrder = (orderId) => async (dispatch, getState) => {
  try {
    const {
      UserLogin: { userInfo },
    } = getState();

    console.log("USER INFO", userInfo);

    dispatch({ type: ORDER_DETAIL_REQUEST });

    const { data } = await api.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    // console.log("DATA DELETE",product)
    dispatch({ type: ORDER_DETAIL_SUCESS, payload: data.data, sucess: true });
  } catch (error) {
    dispatch({ type: ORDER_DETAIL_FAIL, payload: error.message });
  }
};

const Payment = (orderId, newInfo) => async (dispatch, getState) => {
  try {
    const {
      UserLogin: { userInfo },
    } = getState();

    console.log("USER INFO", userInfo);

    dispatch({ type: PAY_REQUEST });

    const { data } = await api.get(`/api/orders/${orderId}/pay`, newInfo, {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    // console.log("DATA DELETE",product)
    dispatch({ type: PAY_SUCESS, payload: data, sucess: true });
  } catch (error) {
    dispatch({ type: PAY_FAIL, payload: error.message });
  }
};

export {
  SaveOrder,
  DeleteOrder,
  ListMyOrders,
  ListOrders,
  DetailOrder,
  Payment,
};
