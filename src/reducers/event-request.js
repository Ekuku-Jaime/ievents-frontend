import { CREATE_REQUEST, GET_REQUESTS, REQUEST_CREATED_FAIL } from '../actions/types';

const initialState = {
  requests: []
};

export default function requests(state = initialState, action) {
  switch (action.type) {
    case GET_REQUESTS:
      return {
        ...state,
        requests: action.payload
      };
    case REQUEST_CREATED_FAIL:
      return {
        ...state
      };

    default:
      return state;
  }
}
