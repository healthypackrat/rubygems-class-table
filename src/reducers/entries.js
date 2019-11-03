import {
  SET_FILTER_KEY,
  SET_SORT_KEY,
  SET_USE_REGEXP,
  SET_INVERT_RESULT,
  SET_HIDE_NO_DOC,
  SELECT_CURRENT_SLUG,
  REQUEST_ENTRIES,
  RECEIVE_ENTRIES
} from '../actions/entries';

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
  filterKey: '',
  sortKey: defaultSortKey,
  sortOrders: {
    class_name: 1,
    class_desc: -1,
    method_count: -1,
    method_desc: -1,
    total: -1
  },
  useRegExp: false,
  invertResult: false,
  hideNoDoc: true,
  percentage: 0,
  bySlug: {},
  filteredEntries: [],
  currentSlug: null
};

const filterEntries = state => {
  const cache = state.bySlug[state.currentSlug];
  const entries = cache ? cache.items : [];

  const sortPriorities = sortPrioritiesMap[state.sortKey];

  return entries.filter(entry => {
    let useRegExp = state.useRegExp;
    let pattern;
    let condition;
    if (useRegExp) {
      try {
        pattern = new RegExp(state.filterKey, 'i');
      } catch (e) {
        useRegExp = false;
      }
    }
    if (useRegExp) {
      condition = pattern.test(entry.class_name);
    } else {
      condition = entry.class_name.toLowerCase().indexOf(state.filterKey.toLowerCase()) !== -1;
    }
    return state.invertResult ? !condition : condition;
  }).filter(entry => {
    if (state.hideNoDoc) {
      return entry.total !== 0;
    } else {
      return true;
    }
  }).sort((a, b) => {
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

const getPercentage = state => {
  const slug = state.currentSlug;
  const cache = slug && state.bySlug[slug];
  const totalEntries = cache ? cache.items : [];
  const totalChars = totalEntries.reduce((sum, entry) => sum + entry.total, 0);

  if (totalChars === 0) {
    return 0;
  }

  const filteredTotalChars = state.filteredEntries.reduce((sum, entry) => sum + entry.total, 0);

  if (state.filteredEntries.length === totalEntries.length) {
    return 100;
  } else if (state.filteredEntries.length === 0) {
    return 0;
  } else {
    return Math.round((filteredTotalChars / totalChars) * 10000) / 100;
  }
};

const on_SET_FILTER_KEY = (state, action) => {
  const newState = {
    ...state,
    filterKey: action.payload.filterKey
  };

  newState.filteredEntries = filterEntries(newState);
  newState.percentage = getPercentage(newState);

  return newState;
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
  newState.percentage = getPercentage(newState);

  return newState;
};

const on_SET_USE_REGEXP = (state, action) => {
  const newState = {
    ...state,
    useRegExp: action.payload.useRegExp
  };

  newState.filteredEntries = filterEntries(newState);
  newState.percentage = getPercentage(newState);

  return newState;
};

const on_SET_INVERT_RESULT = (state, action) => {
  const newState = {
    ...state,
    invertResult: action.payload.invertResult
  };

  newState.filteredEntries = filterEntries(newState);
  newState.percentage = getPercentage(newState);

  return newState;
};

const on_SET_HIDE_NO_DOC = (state, action) => {
  const newState = {
    ...state,
    hideNoDoc: action.payload.hideNoDoc
  };

  newState.filteredEntries = filterEntries(newState);
  newState.percentage = getPercentage(newState);

  return newState;
};

const on_SELECT_CURRENT_SLUG = (state, action) => {
  const newState = {
    ...state,
    currentSlug: action.payload.slug
  };

  newState.filteredEntries = filterEntries(newState);
  newState.percentage = getPercentage(newState);

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
  newState.percentage = getPercentage(newState);

  return newState;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_KEY:
      return on_SET_FILTER_KEY(state, action);
    case SET_SORT_KEY:
      return on_SET_SORT_KEY(state, action);
    case SET_USE_REGEXP:
      return on_SET_USE_REGEXP(state, action);
    case SET_INVERT_RESULT:
      return on_SET_INVERT_RESULT(state, action);
    case SET_HIDE_NO_DOC:
      return on_SET_HIDE_NO_DOC(state, action);
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
