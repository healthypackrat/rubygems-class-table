import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import manifest from './manifest';
import entries from './entries';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  manifest,
  entries
});

export default createRootReducer;
