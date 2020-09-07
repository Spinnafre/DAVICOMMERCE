// Constantes usadas para evitar erros de digitações
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCESS,
  PRODUCT_REGISTER_FAIL,
  PRODUCT_REGISTER_REQUEST,
  PRODUCT_REGISTER_SUCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCESS,
  PRODUCT_REVIEW_RESET
} from "../constants/productConstants";

// Reducar irá possuir um estado inicial e recebe action
function ProductListReducer(state = { products: [] }, action) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true,products:[] };
    case PRODUCT_LIST_SUCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
function ProductsDetailsReducer(state = { product: {reviews: []} }, action) {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
function ProductRegisterReducer(state = { product: {}}, action) {
  switch (action.type) {
    case PRODUCT_REGISTER_REQUEST:
      return { loading: true };
    case PRODUCT_REGISTER_SUCESS:
      return { loading: false, sucess:true,product: action.payload };
    case PRODUCT_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
function ProductDeleteReducer(state = { product: {}}, action) {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCESS:
      return { loading: false, sucess:true,product: action.payload };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
function ProductReviewReducer(state = {}, action) {
  // console.log("STATE= ",state)
  switch (action.type) {
    case PRODUCT_REGISTER_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_SUCESS:
      return { loading: false, review: action.payload,success:true };
    case PRODUCT_REVIEW_FAIL:
      return { loading: false, error: action.payload,success:false };
    case PRODUCT_REVIEW_RESET:
      return{}
    default:
      return state;
  }
}

export { ProductListReducer, ProductsDetailsReducer,ProductRegisterReducer,ProductDeleteReducer,ProductReviewReducer };
