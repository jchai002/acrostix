import React from 'react';
const Nabvar = ({insertPuzzle}) => {
  return (
    <nav className="navbar navbar-dark bg-info">
      <div className="container">
        <div className="row">
          <a className="navbar-brand" href="/">Acrostix</a>
          <a className="btn btn-success" onClick={insertPuzzle}>Create Puzzle</a>
        </div>
      </div>
    </nav>
  );
}

export default Nabvar
