import { MINUTED_CREATE_FAIL, MINUTED_CREATE_SUCCESS, MINUTED_LOADED_FAIL } from '../actions/types';

const initialState = {
  minuteds: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MINUTED_CREATE_SUCCESS:
      return {
        ...state,
        minuteds: action.payload
      };

    case MINUTED_LOADED_FAIL:
    case MINUTED_CREATE_FAIL:
      return {
        ...state
      };

    default:
      return state;
  }
}
