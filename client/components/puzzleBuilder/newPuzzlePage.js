import React, { Component } from 'react';
import { Link } from 'react-router';


class newPuzzlePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      puzzleName:'',
      public: true
    }
  }

  insertPuzzle() {
    Meteor.call('puzzles.insert')
  }

  render() {
    return (
      <div id="newPuzzlePage">
        <div className="container">
          <div className="row">
            <div className="col-xs-sm">
              <h1>Create New Puzzle</h1>
              <form>
                name
                public?
                <Link onClick={this.insertPuzzle} to="/">Create</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default newPuzzlePage;
