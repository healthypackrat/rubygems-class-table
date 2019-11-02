import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import manifest from './manifest';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  manifest
});

export default createRootReducer;
