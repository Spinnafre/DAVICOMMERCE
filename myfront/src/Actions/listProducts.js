import api from "../api/api";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCESS
} from "../constants/productConstants";

const listProducts = (category="", searchKeyword="", sortOrder="") => async (dispatch) => {
  try {
    // Disparo a action PRODUCT_LIST_REQUEST que irá realizar o loading
    dispatch({ type: PRODUCT_LIST_REQUEST });
    // console.log("LISTPRODUCTS= ",category,searchKeyword,sortOrder)
    const { data } = await api.get(
      "product/api/products?category="+category+
      "&searchKeyword=" +
      searchKeyword+
      "&sortOrder="+
      sortOrder
    );
    // Disparo a action que irá carregar as listas
    dispatch({ type: PRODUCT_LIST_SUCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const productsDetails = (ProductID) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: ProductID });
    const product = await api.get(`product/api/products/${ProductID}`);
    dispatch({ type: PRODUCT_DETAILS_SUCESS, payload: product.data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};


export { listProducts,productsDetails };
