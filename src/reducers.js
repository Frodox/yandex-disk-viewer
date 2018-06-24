import { combineReducers } from 'redux';
import { userToken } from './properties';
import folder from './viewer/reducers';

const initialAuthState = {
  token: userToken,
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
