import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './configureStore';
import Index from './components/Index';

const store = configureStore();

export default () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={Index} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};
