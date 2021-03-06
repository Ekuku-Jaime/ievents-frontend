/* eslint-disable camelcase */
import axios from 'axios';
import { returnError } from './messages';
import {
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  LOGOUT_SUCCESS,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL
} from './types';

export const loadUser = () => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json'
    }
  };
  try {
    axios
      .get(`${process.env.REACT_APP_API}/auth/users/me/`, config)
      .then((response) => {
        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: USER_LOADED_FAIL
        });
        returnError(error.response.data, error.response.status);
      });
  } catch (error) {
    dispatch({
      type: USER_LOADED_FAIL
    });
  }
};
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS
  });
};
export const login = (values) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const fd = new FormData();
  fd.append('email', values.email);
  fd.append('password', values.password);
  // const body = JSON.stringify({ email, password });
  try {
    axios
      .post(`${process.env.REACT_APP_API}/auth/jwt/create/`, fd, config)
      .then((response) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data
        });
        dispatch(loadUser());
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_FAIL
        });
        dispatch(returnError(error.response.data, error.response.status));
      });
  } catch (error) {
    console.log(error.data);
  }
};

export const register = (values) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(values);
  try {
    axios
      .post(`${process.env.REACT_APP_API}/auth/users/`, body, config)
      .then((response) => {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: response.data
        });
        dispatch(loadUser());
      })
      .catch(() => {
        dispatch({
          type: SIGNUP_FAIL
        });
      });
  } catch (error) {
    console.log(error.data);
  }
};

export const accessConfig = (getState) => {
  const { access } = getState().auth;

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (access) {
    config.headers.Authorization = `JWT ${access}`;
  }
  return config.headers;
};

export const verify = (uid, token) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/json;charset=UTF-8',
      // "Access-Control-Allow-Origin": true,
    }
  };
  const body = JSON.stringify({ uid, token });
  await axios
    .post(`${process.env.REACT_APP_API}/auth/users/activation/`, body, config)
    .then(() => {
      dispatch({
        type: ACTIVATION_SUCCESS
      });
    })
    .catch(() => {
      dispatch({
        type: ACTIVATION_FAIL
      });
      console.log(body);
    });
};

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
    const body = JSON.stringify({ token: localStorage.getItem('access') });
    await axios
      .post(`${process.env.REACT_APP_API}/auth/jwt/verify/`, body, config)
      .then((response) => {
        if (response.data.code !== 'token_not_valid') {
          dispatch({
            type: AUTHENTICATED_SUCCESS
          });
        }
      })
      .catch(() => {
        dispatch({
          type: AUTHENTICATED_FAIL
        });
      });
  }
};

export const resetPassword = (email) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email });

  try {
    await axios.post(`${process.env.REACT_APP_API}/auth/users/reset_password/`, body, config);
    dispatch({
      type: PASSWORD_RESET_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: PASSWORD_RESET_FAIL
    });
    dispatch(returnError(error.response.data, error.response.status));
  }
};
export const resetPasswordConfirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
      await axios.post(
        `${process.env.REACT_APP_API}/auth/users/reset_password_confirm/`,
        body,
        config
      );
      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAIL
      });
    }
  };
