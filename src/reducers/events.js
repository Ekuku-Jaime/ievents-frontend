import { DELETE_EVENT, GET_EVENT, GET_EVENTS, EDIT_EVENT } from '../actions/types';

const initialState = {
  events: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload)
      };
    case GET_EVENT:
    case EDIT_EVENT:
      return {
        ...state,
        [action.payload.id]: action.payload
      };

    default:
      return state;
  }
}
