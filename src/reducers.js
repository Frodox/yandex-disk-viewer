import { combineReducers } from 'redux';

function auth(state = {}, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

function folder(state = {}, action) {
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
