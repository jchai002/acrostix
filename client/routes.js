import React from 'react';
import { Route, IndexRoute } from 'react-router'
import PuzzleBuilder from './components/puzzleBuilder';
import QuoteEntryPage from './components/quoteEntryPage';
import WordEntryPage from './components/wordEntryPage';
import ClueEntryPage from './components/clueEntryPage';

export default (
  <Route path="/" component={PuzzleBuilder}>
    <IndexRoute component={PuzzleBuilder} />
    <Route path="enter-words" component={WordEntryPage} />
    <Route path="enter-clues" component={ClueEntryPage} />
  </Route>
);
