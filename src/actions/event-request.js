import axios from 'axios';
import { GET_REQUESTS, CREATE_REQUEST } from './types';
import { createMessage, returnError } from './messages';

export const getRequests = () => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`
    }
  };
  axios
    .get('http://localhost:8000/api/getpedidos/', config)
    .then((response) => {
      dispatch({ type: GET_REQUESTS, payload: response.data });
      dispatch(createMessage({ requestLoaded: 'requests loaded' }));
    })
    .catch((error) => console.log(error.status));
};

export const addRequest = (formValues, user) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`
    }
  };
  const form = new FormData();
  form.append('title', formValues.title);
  form.append('description', formValues.description);
  form.append('user', Number(user));
  axios
    .post('http://localhost:8000/api/pedidos/', form, config)
    .then((response) => {
      dispatch({ type: CREATE_REQUEST, payload: response.data });
      dispatch(createMessage({ requested: 'Pedido feito com sucesso' }));
    })
    .catch((error) => returnError(error.response.data, error.response.status));
};

export const acceptRequest = (formValues, id) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`
    }
  };
  const form = new FormData();
  form.append('status', 'accepted');
  form.append('response', formValues.response);
  axios
    .patch(`http://localhost:8000/api/pedidos/${id}/`, form, config)
    .then((response) => {
      dispatch({ type: CREATE_REQUEST, payload: response.data });
    })
    .catch((error) => error.response.data);
};

export const rejectRequest = (formValues, id) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`
    }
  };
  const form = new FormData();
  form.append('status', 'rejected');
  form.append('response', formValues.response);
  axios
    .patch(`http://localhost:8000/api/pedidos/${id}/`, form, config)
    .then((response) => {
      dispatch({ type: CREATE_REQUEST, payload: response.data });
    })
    .catch((error) => error.response.data);
};