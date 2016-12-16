import React from 'react';
import { Route, IndexRoute } from 'react-router'
import PuzzleBuilder from './components/puzzleBuilder/container';
import App from './components/app'
export default (
  <Route path="/" component={App}>
    <IndexRoute component={PuzzleBuilder} />
  </Route>
);
