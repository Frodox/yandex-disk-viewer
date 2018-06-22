const START_LOADING = 'START_LOADING';
const startLoading = () => ({
  type: START_LOADING,
});

const STOP_LOADING = 'STOP_LOADING';
const stopLoading = () => ({
  type: STOP_LOADING,
});

const SETUP_NAME = 'SETUP_NAME';
const setupName = name => ({
  type: SETUP_NAME,
  name,
});

const SET_ITEMS = 'SET_ITEMS';
const setItems = items => ({
  type: SET_ITEMS,
  items,
});

export const loadFolder = path => (dispatch, getState) => {
  dispatch(startLoading());
  //TODO: Is it ok to normalize path here?
  let name = path
    .trim()
    .split('/')
    .pop();
  if (0 === name.length) {
    name = 'Files';
  }
  dispatch(setupName(name));

  const searchParamFields = ['size', 'type', 'path', 'name']
    .map(item => `_embedded.items.${item}`)
    .join(',');
  const searchParams = new URLSearchParams(
    `path=${path}&fields=${searchParamFields}`
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
      dispatch(stopLoading());
      dispatch(setItems(json._embedded.items));
    });
};

export { SET_ITEMS, SETUP_NAME, START_LOADING, STOP_LOADING };
