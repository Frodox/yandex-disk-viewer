import { SET_ERROR, SET_ITEMS, START_LOADING, STOP_LOADING } from './actions';
const initialFolderState = {
  isLoading: false,
  items: null,
};

export function folder(state = initialFolderState, action) {
  switch (action.type) {
    case SET_ERROR: {
      const { error } = action;
      return {
        ...state,
        error,
      };
    }
    case SET_ITEMS: {
      const { items } = action;
      return {
        ...state,
        items,
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
