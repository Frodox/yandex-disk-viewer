import { Dispatch } from 'redux';
import { IStoreState } from '../app/types';
import * as C from './constants';
import { IFileMeta, IViewerError } from './types';

interface IStartLoading {
  type: C.START_LOADING;
}

interface IStopLoading {
  type: C.STOP_LOADING;
}

interface ISetError {
  type: C.SET_ERROR;
  error: IViewerError;
}

interface ISetMeta {
  type: C.SET_META;
  items: IFileMeta[];
  total: number;
}

interface ISetPath {
  type: C.SET_PATH;
  path: string;
}

export type LoadFolderAction = (
  path: string
) => (dispatch: Dispatch, getState: () => IStoreState) => Promise<void>;

export type ViewerAction = IStartLoading | IStopLoading | ISetError | ISetMeta | ISetPath;

const startLoading = (): IStartLoading => ({
  type: C.START_LOADING,
});

const stopLoading = (): IStopLoading => ({
  type: C.STOP_LOADING,
});

const setError = (error: IViewerError): ISetError => ({
  type: C.SET_ERROR,
  error,
});

const setMeta = (items: IFileMeta[], total: number): ISetMeta => ({
  type: C.SET_META,
  items,
  total,
});

const setPath = (path: string): ISetPath => ({
  type: C.SET_PATH,
  path,
});

export const loadFolder: LoadFolderAction = (path: string) => async (dispatch, getState) => {
  const { path: currentPath } = getState().folder;

  if (path !== currentPath) {
    dispatch(setPath(path));
  }

  dispatch(startLoading());

  // It's important to get items only after setPath call.
  const { items } = getState().folder;
  const offset = items.length;
  const searchParamFields = ['size', 'type', 'path', 'name']
    .map(item => `_embedded.items.${item}`)
    .join(',');
  const searchParams = new URLSearchParams(
    `path=${path}&offset=${offset}&fields=${searchParamFields},_embedded.total`,
  );
  const { token } = getState().auth;
  const fetchInit = {
    headers: new Headers({
      Authorization: `OAuth ${token}`,
    }),
    method: 'GET',
  };

  try {
    const response = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources?${searchParams}`,
      fetchInit,
    );
    const json = await response.json();
    const { _embedded } = json;
    if (_embedded) {
      // 200 OK
      const { items: fileMetaItems, total } = _embedded;
      dispatch(setMeta(fileMetaItems, total));
    } else {
      dispatch(setError(json));
    }
  } catch (e) {
    const { message } = e;
    dispatch(setError({ message }));
  }

  dispatch(stopLoading());
};
