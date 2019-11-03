import { SET_SORT_KEY, SELECT_CURRENT_SLUG, REQUEST_ENTRIES, RECEIVE_ENTRIES } from '../actions/entries';

const sortPrioritiesMap = {
  class_name: ['class_name'],
  class_desc: ['class_desc', 'method_desc', 'method_count', 'class_name'],
  method_count: ['method_count', 'method_desc', 'class_desc', 'class_name'],
  method_desc: ['method_desc', 'class_desc', 'method_count', 'class_name'],
  total: ['total', 'method_desc', 'class_desc', 'method_count', 'class_name']
};

const defaultSortKey = 'total';
const validSortKeys = Object.keys(sortPrioritiesMap);

const initialState = {
  sortKey: defaultSortKey,
  sortOrders: {
    class_name: 1,
    class_desc: -1,
    method_count: -1,
    method_desc: -1,
    total: -1
  },
  bySlug: {},
  filteredEntries: [],
  currentSlug: null
};

const filterEntries = state => {
  const cache = state.bySlug[state.currentSlug];
  const entries = cache ? cache.items : [];

  const sortPriorities = sortPrioritiesMap[state.sortKey];

  return entries.slice().sort((a, b) => {
    for (let i = 0; i < sortPriorities.length; i++) {
      const key = sortPriorities[i];
      const x = a[key];
      const y = b[key];
      const order = state.sortOrders[key];
      if (x < y) {
        return -1 * order;
      } else if (x > y) {
        return 1 * order;
      }
    }
    return 0;
  }).map((entry, index) => {
    return {
      ...entry,
      index: index + 1
    };
  });
};

const on_SET_SORT_KEY = (state, action) => {
  let sortKey = action.payload.sortKey;

  if (!validSortKeys.includes(sortKey)) {
    sortKey = defaultSortKey;
  }

  const order = (action.payload.reverse && sortKey === state.sortKey) ? -1 : 1;
  const sortOrders = {...state.sortOrders};
  sortOrders[sortKey] *= order;

  const newState = {
    ...state,
    sortKey,
    sortOrders
  };

  newState.filteredEntries = filterEntries(newState);

  return newState;
};

const on_SELECT_CURRENT_SLUG = (state, action) => {
  const newState = {
    ...state,
    currentSlug: action.payload.slug
  };

  newState.filteredEntries = filterEntries(newState);

  return newState;
};

const on_REQUEST_ENTRIES = (state, action) => {
  const slug = action.payload.slug;

  return {
    ...state,
    bySlug: {
      ...state.bySlug,
      [slug]: {
        isFetching: true,
        items: []
      }
    }
  };
};

const on_RECEIVE_ENTRIES = (state, action) => {
  const slug = action.payload.slug;

  const newState = {
    ...state,
    bySlug: {
      ...state.bySlug,
      [slug]: {
        isFetching: false,
        items: action.payload.data
      }
    }
  };

  newState.filteredEntries = filterEntries(newState);

  return newState;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SORT_KEY:
      return on_SET_SORT_KEY(state, action);
    case SELECT_CURRENT_SLUG:
      return on_SELECT_CURRENT_SLUG(state, action);
    case REQUEST_ENTRIES:
      return on_REQUEST_ENTRIES(state, action);
    case RECEIVE_ENTRIES:
      return on_RECEIVE_ENTRIES(state, action);
    default:
      return state;
  }
};
