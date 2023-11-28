
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    CLEAR_ERRORS,
} from '../constants/userConstants'



export const authReducer  = (state = {user: {} }, actions) => {

  switch (actions.type) {
    case LOGIN_REQUEST:
      case REGISTER_USER_REQUEST:

      return {
        loading:true,
        isAuthenticated:false,
      }
      case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:

      return {
        ...state,
        loading: false,
        isAuthenticated:true,
        user: actions.payload

      }

      case LOGIN_FAIL:
       case REGISTER_USER_FAIL:


      return {
        ...state,
       loading:false,
       isAuthenticated:false,
       user:null,
       error: actions.payload,
      }

      case CLEAR_ERRORS:

      return {
        ...state,
        error:null,

      }
  
    default:
      return state;
  }

}