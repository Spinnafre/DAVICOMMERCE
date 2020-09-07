import api from "../api/api";
import Cookie from "js-cookie";
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_ERROR,
  LOGIN_REQUEST_SUCESS,
  REGISTER_REQUEST,
  REGISTER_REQUEST_ERROR,
  REGISTER_REQUEST_SUCESS,
  LOGOUT_SUCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCESS
} from "../constants/UserConstants";


const UpdateUser=({userId,email,name,password})=>async(dispatch,getState)=>{
  try {
    dispatch({type:UPDATE_USER_REQUEST})
    // Estou pegando do meu estado a informação do usuário (email, senha,token,...)
    const {
      UserLogin: { userInfo },
    } = getState();
    const {data}=await api.put(`user/api/updateUser/${userId}`,{name,email,password},{
      // Estou definindo que para acesssar essa rota eu preciso dos dados do usuário no header
      headers:{
        'Authorization':'Bearer '+userInfo.token
      }
    })
    console.log("UPDATE USER= ",data)
    dispatch({type:UPDATE_USER_SUCESS,payload:data})
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({type:UPDATE_USER_ERROR,error:error})
  }
}
const Login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST, payload: { email, password } });
    const { data } = await api.post("user/api/signin", { email, password });
    dispatch({ type: LOGIN_REQUEST_SUCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: LOGIN_REQUEST_ERROR, payload: error.message });
  }
};
const Logout = () => async (dispatch) => {
    Cookie.remove("userInfo");
    Cookie.remove("carts")
    dispatch({ type: LOGOUT_SUCESS });
};

const Register = (email, password, name) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST, payload: { email, password, name } });
    const { data } = await api.post("user/api/register", {
      email,
      password,
      name,
    });
    console.log("REGISTER= ",data)
    dispatch({ type: REGISTER_REQUEST_SUCESS, payload: data });
    Cookie.set('userInfo',JSON.stringify(data))
  } catch (error) {
    dispatch({ type: REGISTER_REQUEST_ERROR, payload: error.message });
  }
};


export { Login, Register,Logout,UpdateUser };
