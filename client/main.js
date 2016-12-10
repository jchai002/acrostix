import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>
      react app
    </div>
  );
};

Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('.container'));
});
