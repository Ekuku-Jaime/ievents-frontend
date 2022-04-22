import axios from 'axios';

import { DELETE_EVENT, GET_EVENT, GET_EVENTS, EDIT_EVENT, ADD_EVENT } from './types';
import { createMessage } from './messages';

export const getEvents = () => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  axios
    .get('http://localhost:8000/api/events/', config)
    .then((response) => {
      dispatch({ type: GET_EVENTS, payload: response.data });
    })
    .catch((error) => error.response.data);
};

export const addEvent = (formValues) => (dispatch) => {
  const formData = new FormData();
  formData.append('name', formValues.image.name);
  formData.append('image', formValues.image);
  formData.append('title', formValues.title);
  formData.append('student_name', formValues.studentName);
  formData.append('panelist', formValues.panelist);
  formData.append('description', formValues.description);
  formData.append('initial_date', formValues.initialDate);
  formData.append('end_date', formValues.endDate);
  formData.append('local', formValues.local);
  formData.append('type', formValues.type);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`
    }
  };
  axios
    .post('http://localhost:8000/api/events/', formData, config)
    .then((response) => {
      dispatch({ type: ADD_EVENT, payload: response.data });
    })
    .catch((error) => error.response.data);
};

export const getEvent = (id) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
      // Authorization: `JWT ${localStorage.getItem('access')}`
    }
  };
  axios
    .get(`http://localhost:8000/api/events/${id}`, config)
    .then((response) => {
      dispatch({
        type: GET_EVENT,
        payload: response.data
      });
    })
    .catch((error) => console.log(error));
};
export const deleteEvent = (id) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`
    }
  };
  axios
    .delete(`http://localhost:8000/api/events/${id}`, config)
    .then(() => {
      dispatch({
        type: DELETE_EVENT
      });
      dispatch(createMessage({ eventDeleted: 'Evento eliminado com sucesso' }));
    })
    .catch((error) => console.log(error));
};

export const editEvent = (id, formValues) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`
    }
  };
  const formData = new FormData();
  formData.append('name', formValues.image.name);
  formData.append('image', formValues.image);
  formData.append('title', formValues.title);
  formData.append('description', formValues.description);
  formData.append('initial_date', formValues.initialDate);
  formData.append('end_date', formValues.endDate);
  formData.append('local', formValues.local);
  formData.append('type', formValues.type);
  axios
    .patch(`http://localhost:8000/api/events/${id}/`, formData, config)
    .then((response) => {
      dispatch({
        type: EDIT_EVENT,
        payload: response.data
      });
      dispatch(createMessage({ eventEdited: 'Evento editado com sucesso' }));
    })
    .catch((error) => {
      console.log(error);
    });
};
