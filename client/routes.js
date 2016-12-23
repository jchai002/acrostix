import React from 'react';
import { Route, IndexRoute } from 'react-router'
import PuzzlesList from './components/puzzlesList';
import PuzzleBuilder from './components/puzzleBuilder/builder';
import App from './components/app'
export default (
  <Route path="/" component={App}>
    <IndexRoute component={PuzzlesList} />
    <Route path="puzzles/:puzzleId" component={PuzzleBuilder} />
  </Route>
);
