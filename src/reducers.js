import { combineReducers } from 'redux';
import { folder } from './viewer/reducers';

const initialAuthState = {
  token: 'AQAAAAAJ6tSJAAUR-zlOqAhmU00brDIp_0s4SM0',
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
