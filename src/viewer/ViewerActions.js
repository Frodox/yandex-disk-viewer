const START_LOADING = 'START_LOADING';
const startLoading = () => ({
  type: START_LOADING,
});

const STOP_LOADING = 'STOP_LOADING';
const stopLoading = () => ({
  type: STOP_LOADING,
});

const SET_ERROR = 'SET_ERROR';
const setError = error => ({
  type: SET_ERROR,
  error,
});

const SET_META = 'SET_META';
const setMeta = (items, total) => ({
  type: SET_META,
  items,
  total,
});

const SET_PATH = 'SET_PATH';
const setPath = path => ({
  type: SET_PATH,
  path,
});

export const loadFolder = _path => async (dispatch, getState) => {
  const { path } = getState().folder;

  if (_path !== path) {
    dispatch(setPath(_path));
  }

  dispatch(startLoading());

  // It's important to get items only after setPath call.
  const { items } = getState().folder;
  const offset = items.length;
  const searchParamFields = ['size', 'type', 'path', 'name']
    .map(item => `_embedded.items.${item}`)
    .join(',');
  const searchParams = new URLSearchParams(
    `path=${_path}&offset=${offset}&fields=${searchParamFields},_embedded.total`,
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

export {
  SET_ERROR, SET_META, SET_PATH, START_LOADING, STOP_LOADING,
};
