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

function UserReducerSignin(state = {}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true
      };

    case LOGIN_REQUEST_SUCESS:
      return {
        loading: false,
        userInfo: action.payload
      };

    case LOGIN_REQUEST_ERROR:
      return { loading: false, error: action.payload };
    case LOGOUT_SUCESS:
      return{}
    default:
      return state;
  }
}
function UserReducerRegister(state={},action){
    switch (action.type) {
        case REGISTER_REQUEST:
          return {
            loading: true,
          };
    
        case REGISTER_REQUEST_SUCESS:
          return {
            loading: false,
            userInfo: action.payload,
          };
    
        case REGISTER_REQUEST_ERROR:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
}
function UserReducerUpdate(state={},action){
    switch (action.type) {
        case UPDATE_USER_REQUEST:
          return {
            loading: true,
          };
    
        case UPDATE_USER_SUCESS:
          return {
            loading: false,
            InfoUser: action.payload,
          };
    
        case UPDATE_USER_ERROR:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
}

export { UserReducerSignin,UserReducerRegister, UserReducerUpdate };
