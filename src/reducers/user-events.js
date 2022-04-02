import { USER_EVENT_ADDED_FAIL, USER_EVENT_LOADED } from '../actions/types';

const initialState = {
  eventsUser: []
};

export default function userEvents(state = initialState, action) {
  switch (action.type) {
    case USER_EVENT_LOADED:
      return {
        ...state,
        eventsUser: action.payload
      };
    case USER_EVENT_ADDED_FAIL:
      return {
        ...state
      };

    default:
      return state;
  }
}
