import { AnyAction, combineReducers } from 'redux';
import folder from '../viewer/ViewerReducer';
import { IAuthState, IStoreState } from './types';

const initialAuthState = {
  token: process.env.REACT_APP_USER_OAUTH_TOKEN!,
};

function auth(state: IAuthState = initialAuthState, action: AnyAction): IAuthState {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export default combineReducers<IStoreState>({
  auth,
  folder,
});
