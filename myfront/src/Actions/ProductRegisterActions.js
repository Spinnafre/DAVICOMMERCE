import api from "../api/api";
import {
  PRODUCT_REGISTER_FAIL,
  PRODUCT_REGISTER_REQUEST,
  PRODUCT_REGISTER_SUCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_SUCESS,
  PRODUCT_REVIEW_REQUEST
} from "../constants/productConstants";

const Register = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_REGISTER_REQUEST });
    const {
      UserLogin: { userInfo },
    } = getState();
    console.log("REGISTER ACTION PAYLOAD ",product)
    // Caso
    if (!product._id) {
      const { data } = await api.post("product/api/products", product, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch({ type: PRODUCT_REGISTER_SUCESS, payload: data });
    } else {
      const { data } = await api.put(
        'product/api/products/'+product._id,
        product,
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
        );
        dispatch({ type: PRODUCT_REGISTER_SUCESS, payload: data });
      }
    // Disparo a action que irá carregar as listas
  } catch (error) {
    dispatch({ type: PRODUCT_REGISTER_FAIL, payload: error.message });
  }
};
const Delete = (product) => async (dispatch, getState) => {
  try {
    const {
      UserLogin: { userInfo },
    } = getState();
    console.log('USER INFO', userInfo)

    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: product });

    const {data} = await api.delete('product/api/products/'+ product,{
      headers:{
        Authorization: "Bearer " + userInfo.token,
      }
    });
    // console.log("DATA DELETE",product)
    dispatch({ type: PRODUCT_DELETE_SUCESS, payload: data,sucess:true});
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message});
  }
};

const AddReview=(productID,review)=>async(dispatch,getState)=>{
  try {
    const {
      UserLogin: { userInfo },
    } = getState();

    dispatch({type:PRODUCT_REVIEW_REQUEST})
    const {data}=await api.post(`/product/api/${productID}/reviews`,review,{
      headers:{
        Authorization:"Bearer " + userInfo.token,
      }
    })


    console.log("DATA- ADD REVIEW= ",data)
    dispatch({type:PRODUCT_REVIEW_SUCESS,payload:data})

  } catch (error) {
    dispatch({type:PRODUCT_REVIEW_FAIL,payload:error})
  }
}

export { Register,Delete,AddReview };
