import api from "../api/api";
import Cookie from "js-cookie";

import {CART_SAVE_SHIPPING, CART_SAVE_PAYMENT} from '../constants/ShippingConstants'

const addToCart = (ProductID, ProductQTD) => async (dispatch, getState) => {
  try {
    const product = await api.get(`product/api/products/${ProductID}`);
    const data = {
      id: product.data._id,
      name: product.data.name,
      category: product.data.category,
      img: product.data.image,
      price: product.data.price,
      brande: product.data.brande,
      rating: product.data.rating,
      numReviews: product.data.numReviews,
      description: product.data.description,
      qtd: Number(ProductQTD),
      QtdStock: product.data.QtdStock,
    };
    dispatch({ type: "ADD_TO_CART_ITEM", payload: data });
    const {addToCart:{carts}}= getState();
    Cookie.set("carts",JSON.stringify(carts))
  } catch (error) {
    dispatch({ type: "ADD_TO_CART_ERROR", payload: error.message });
  }
};

const RemoveFromCart = (ID) => async (dispatch, getState) => {
  try {
    // await api.delete()
    dispatch({ type: "REMOVE_CART_ITEM", payload: ID });
    const {addToCart:{carts}}= getState();
    // console.log("STATE= ",cart.addToCart.carts)
    Cookie.set("carts", JSON.stringify(carts));
  } catch (error) {}
};
const SaveShipping = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING, payload: data });

};
const SavePayment=(paymentMethod)=>(dispatch)=>{
  dispatch({type:CART_SAVE_PAYMENT,payload:paymentMethod})
}

export { addToCart, RemoveFromCart,SaveShipping,SavePayment };
