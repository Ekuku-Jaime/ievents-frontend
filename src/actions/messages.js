import { CREATE_MESSAGE, GET_ERRORS } from './types';

export const createMessage = (message) => ({
  type: CREATE_MESSAGE,
  payload: message
});

export const returnError = (message, status) => ({
  type: GET_ERRORS,
  payload: { message, status }
});
