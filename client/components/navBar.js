import React from 'react';
import Accounts from './accounts';

const Nabvar = ({insertPuzzle}) => {
  return (
    <nav className="navbar navbar-dark bg-info">
      <div className="container">
        <div className="row">
          <a className="navbar-brand" href="/">Acrostix</a>
          <div className="nav-buttons">
            <Accounts />
            <a className="btn btn-success" onClick={insertPuzzle}>Create Puzzle</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nabvar
