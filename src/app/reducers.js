import { combineReducers } from 'redux';
import folder from '../viewer/reducers';

const initialAuthState = {
  token: process.env.REACT_APP_USER_OAUTH_TOKEN,
};

function auth(state = initialAuthState, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export default combineReducers({
  auth,
  folder,
});
