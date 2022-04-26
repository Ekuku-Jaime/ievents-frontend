import axios from 'axios';
import {
  MINUTED_CREATE_FAIL,
  MINUTED_CREATE_SUCCESS,
  MINUTED_LOADED_FAIL,
  MINUTED_LOADED_SUCCESS
} from './types';

export const getMinuteds = () => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  axios
    .get(`${process.env.API}/api/acta/`, config)
    .then((response) => {
      dispatch({ type: MINUTED_LOADED_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({
        type: MINUTED_LOADED_FAIL
      });
    });
};

export const addMinuted = (formValues, event) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`
    }
  };
  const form = new FormData();
  // form.append('minuted', formValues.minuted);
  form.append('event', Number(event));
  formValues.files2.forEach((file) => {
    form.append('minuted', file);
  });
  axios
    .post(`${process.env.API}/api/acta/`, form, config)
    .then((response) => {
      dispatch({ type: MINUTED_CREATE_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: MINUTED_CREATE_FAIL });
    });
};
