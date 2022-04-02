import {
  ACTIVATION_FAIL,
  ACTIVATION_SUCCESS,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  USER_LOADED_FAIL,
  USER_LOADED_SUCCESS
} from '../actions/types';

const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: !!localStorage.getItem('access'),
  user: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('access', payload.access);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh
      };
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null
      };
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true
      };
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false
      };
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false
      };
    case PASSWORD_RESET_CONFIRM_FAIL:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case ACTIVATION_SUCCESS:
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_FAIL:
    case ACTIVATION_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}
