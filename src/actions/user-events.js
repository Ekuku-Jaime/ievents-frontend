import axios from 'axios';
import { USER_EVENT_ADDED_SUCCESS, USER_EVENT_LOADED } from './types';

export const getUserEvents = () => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  axios
    .get('http://localhost:8000/api/user_events/', config)
    .then((response) => {
      dispatch({ type: USER_EVENT_LOADED, payload: response.data });
    })
    .catch((error) => error.response.data);
};

export const addUserEvent = (event, user) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`
    }
  };
  const form = new FormData();

  form.append('user', Number(user));
  form.append('evento', Number(event));
  axios
    .post('http://localhost:8000/api/event_post/', form, config)
    .then((response) => {
      dispatch({ type: USER_EVENT_ADDED_SUCCESS, payload: response.data });
    })
    .catch((error) => error.response.data);
};
