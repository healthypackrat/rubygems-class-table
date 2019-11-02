export const REQUEST_MANIFEST = 'REQUEST_MANIFEST';
export const RECEIVE_MANIFEST = 'RECEIVE_MANIFEST';

const requestManifest = () => ({
  type: REQUEST_MANIFEST
});

const receiveManifest = (data) => ({
  type: RECEIVE_MANIFEST,
  payload: {
    data
  }
});

const fetchManifest = () => dispatch => {
  dispatch(requestManifest());
  return fetch('gems.json')
    .then(response => response.json())
    .then(data => dispatch(receiveManifest(data)))
    .catch(error => console.error(error));
};

const shouldFetchManifest = state => {
  const manifest = state.manifest;

  if (manifest.isFetching) {
    return false;
  }

  return !manifest.items.length;
};

export const fetchManifestIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchManifest(getState())) {
    return dispatch(fetchManifest());
  }
};
