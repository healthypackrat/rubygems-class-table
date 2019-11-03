import {
  setFilterKey,
  setSortKey,
  setUseRegExp,
  setInvertResult,
  setHideNoDoc
} from '../actions/entries';
const qs = require('query-string');

let done = false;

const loadStateFromLocation = ({ getState, dispatch }) => next => action => {
  if (!done) {
    done = true;

    const router = getState().router;

    if (new RegExp('^/gems/[^/]+$').test(router.location.pathname) && router.location.search) {
      const params = qs.parse(router.location.search);
      dispatch(setFilterKey(params.filterKey || ''));
      dispatch(setSortKey(params.sortKey, false));
      dispatch(setUseRegExp(params.useRegExp === 'true'));
      dispatch(setInvertResult(params.invertResult === 'true'));
      dispatch(setHideNoDoc(params.hideNoDoc === 'true'));
    }
  }

  return next(action);
};

export default loadStateFromLocation;
