import 'babel-polyfill';
import React from 'react';
import routes from './routes';
import { Router, browserHistory } from 'react-router'
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import PuzzleBuilder from './components/puzzleBuilder/app';

const store = configureStore();

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <Router history={browserHistory} routes= {routes} />
    </Provider>,
    document.getElementById('root')
  );
});
