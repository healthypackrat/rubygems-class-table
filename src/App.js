import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './configureStore';
import Index from './components/Index';
import EntryList from './components/EntryList';

const store = configureStore();

export default () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/gems/:slug" component={EntryList} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};
