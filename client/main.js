import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import Puzzle from './components/puzzle';

store = configureStore();

Meteor.startup(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Puzzle />
    </Provider>,
    document.querySelector('.react-top-level');
  );
});
