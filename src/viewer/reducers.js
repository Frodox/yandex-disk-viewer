import { SET_ITEMS, SETUP_NAME, START_LOADING, STOP_LOADING } from './actions';
const initialFolderState = {
  isLoading: false,
  items: null,
  name: '',
};

export function folder(state = initialFolderState, action) {
  switch (action.type) {
    case SET_ITEMS: {
      const { items } = action;
      return {
        ...state,
        items
      };
    }
    case SETUP_NAME: {
      const { name } = action;
      return {
        ...state,
        name,
      };
    }
    case START_LOADING: {
      return {
        ...initialFolderState,
        isLoading: true,
      };
    }
    case STOP_LOADING: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
}
