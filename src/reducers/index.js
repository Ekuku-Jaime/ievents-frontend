import { combineReducers } from 'redux';
import auth from './auth';
import events from './events';
import images from './images';
import requests from './event-request';
import minuted from './minuted';
import messages from './messages';
import errors from './errors';
import userEvents from './user-events';

export default combineReducers({
  auth,
  events,
  images,
  requests,
  minuted,
  messages,
  errors,
  userEvents
});
