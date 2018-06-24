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

export const loadFolder = _path => (dispatch, getState) => {
  const { path } = getState().folder;

  if (_path !== path) {
    dispatch(setPath(_path));
  }

  dispatch(startLoading());

  // It's important to get items only after setPath call.
  const { items } = getState().folder;
  const offset = items ? items.length : 0;
  const searchParamFields = ['size', 'type', 'path', 'name']
    .map(item => `_embedded.items.${item}`)
    .join(',');
  const searchParams = new URLSearchParams(
    `path=${_path}&offset=${offset}&fields=${searchParamFields},_embedded.total`
  );
  const { token } = getState().auth;
  const fetchInit = {
    headers: new Headers({
      Authorization: `OAuth ${token}`,
    }),
    method: 'GET',
  };
  return fetch(
    'https://cloud-api.yandex.net/v1/disk/resources?' + searchParams,
    fetchInit
  )
    .then(response => response.json())
    .then(json => {
      const { _embedded } = json;
      if (_embedded) {
        // 200 OK
        const { items, total } = _embedded;
        dispatch(setMeta(items, total));
      } else {
        dispatch(setError(json));
      }

      dispatch(stopLoading());
    });
};

export { SET_ERROR, SET_META, SET_PATH, START_LOADING, STOP_LOADING };
