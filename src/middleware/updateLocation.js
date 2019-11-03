import { push } from 'connected-react-router';
import {
  SET_FILTER_KEY,
  SET_SORT_KEY,
  SET_USE_REGEXP,
  SET_INVERT_RESULT,
  SET_HIDE_NO_DOC
} from '../actions/entries';
const qs = require('query-string');

const updateLocation = ({ getState, dispatch }) => next => action => {
  const result = next(action);
  switch (action.type) {
    case SET_FILTER_KEY:
    case SET_SORT_KEY:
    case SET_USE_REGEXP:
    case SET_INVERT_RESULT:
    case SET_HIDE_NO_DOC:
      const router = getState().router;
      const pathname = router.location.pathname;
      const currentLocation = pathname + router.location.search;

      const entries = getState().entries;

      const query = qs.stringify({
        filterKey: entries.filterKey,
        sortKey: entries.sortKey,
        useRegExp: entries.useRegExp,
        invertResult: entries.invertResult,
        hideNoDoc: entries.hideNoDoc
      });

      const newLocation = entries.filterKey ? `${pathname}?${query}` : pathname;

      if (newLocation !== currentLocation) {
        dispatch(push(newLocation));
      }
      break;
    default:
      break;
  }
  return result;
};

export default updateLocation;
