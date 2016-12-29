import React from 'react';
import Accounts from './accounts';
import { Link } from 'react-router';

const Nabvar = ({insertPuzzle}) => {
  return (
    <nav className="navbar navbar-dark bg-info">
      <div className="container">
        <div className="row">
          <div className="nav-buttons">
            <a className="navbar-brand" href="/"><i className="fa fa-newspaper-o"/>Acrostix</a>
            <Accounts />
          </div>
          <Link className="btn btn-success" to="/new-puzzle">New Puzzle</Link>
        </div>
      </div>
    </nav>
  );
}

export default Nabvar
