export const SET_SORT_KEY = 'SET_SORT_KEY';

export const setSortKey = (sortKey, reverse = true) => ({
  type: SET_SORT_KEY,
  payload: {
    sortKey,
    reverse
  }
});

export const SELECT_CURRENT_SLUG = 'SELECT_CURRENT_SLUG';
export const REQUEST_ENTRIES = 'REQUEST_ENTRIES';
export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES';

export const selectCurrentSlug = slug => ({
  type: SELECT_CURRENT_SLUG,
  payload: {
    slug
  }
});

const requestEntries = slug => ({
  type: REQUEST_ENTRIES,
  payload: {
    slug
  }
});

const receiveEntries = (slug, data) => ({
  type: RECEIVE_ENTRIES,
  payload: {
    slug,
    data
  }
});

const fetchEntries = slug => dispatch => {
  dispatch(requestEntries(slug));
  return fetch(`gems/${slug}.json`)
    .then(response => response.json())
    .then(data => dispatch(receiveEntries(slug, data)))
    .catch(error => console.error(error));
};

const shouldFetchEntries = (state, slug) => {
  const entries = state.entries;
  const cache = entries.bySlug[slug];

  if (!cache) {
    return true;
  }

  if (cache.isFetching) {
    return false;
  }

  return !cache.items.length;
};

export const fetchEntriesIfNeeded = slug => (dispatch, getState) => {
  if (shouldFetchEntries(getState(), slug)) {
    return dispatch(fetchEntries(slug));
  }
};
