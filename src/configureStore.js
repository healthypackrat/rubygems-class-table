import { createHashHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';
import loadStateFromLocation from './middleware/loadStateFromLocation';
import updateLocation from './middleware/updateLocation';

export const history = createHashHistory();

const middleware = [thunk, routerMiddleware(history), loadStateFromLocation, updateLocation];

export default function configureStore(preloadedState) {
  return createStore(
    createRootReducer(history),
    preloadedState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
}
