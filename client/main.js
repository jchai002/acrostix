import React from 'react';
import ReactDOM from 'react-dom';
import Puzzle from './components/puzzle';
const App = () => {
  return (
    <div>
      <Puzzle />
    </div>
  );
};

Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('.react-top-level'));
});
