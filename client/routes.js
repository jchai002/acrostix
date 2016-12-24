import React from 'react';
import { Route, IndexRoute } from 'react-router'
import PuzzlesList from './components/puzzlesList';
import NewPuzzlePage from './components/puzzleBuilder/newPuzzlePage';
import PuzzleBuilder from './components/puzzleBuilder/builder';
import App from './components/app'
export default (
  <Route path="/" component={App}>
    <IndexRoute component={PuzzlesList} />
    <Route path="/new-puzzle" component={NewPuzzlePage} />
    <Route path="/puzzles/:puzzleId" component={PuzzleBuilder} />
  </Route>
);
