import axios from 'axios';
import { createMessage } from './messages';
// import history from 'src/routers/history';
import { ADD_IMAGE, GET_IMAGES } from './types';

export const addEventImages = (id, formValues) => (dispatch) => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  };
  const formData = new FormData();
  formData.append('evento', JSON.stringify(id));

  formValues.files1.forEach((file) => {
    formData.append('image', file);
  });

  axios
    .post(`${process.env.REACT_APP_API}/api/images/`, formData, config)
    .then((response) => {
      dispatch({ type: ADD_IMAGE, payload: response.data });
      dispatch(createMessage({ imagesAdded: 'Imagens adionadas com sucesso' }));
    })
    .catch((error) => error.response.data);
};

export const getImages = () => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  axios
    .get(`${process.env.REACT_APP_API}/api/images/`, config)
    .then((response) => {
      dispatch({ type: GET_IMAGES, payload: response.data });
    })
    .catch((error) => error.response.data);
};
