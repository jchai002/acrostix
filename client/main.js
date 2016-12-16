import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import PuzzleBuilder from './components/puzzleBuilder';
const store = configureStore();

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <PuzzleBuilder />
    </Provider>,
    document.getElementById('root')
  );
});
