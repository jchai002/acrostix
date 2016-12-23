import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Puzzles } from '../../collections/puzzles';
import { Link } from 'react-router';

class PuzzlesList extends Component {
  onPuzzleRemove(puzzle) {
    Meteor.call('puzzles.remove', puzzle);
  }

  renderList() {
    return this.props.puzzles.map(puzzle => {
      const url = `/puzzles/${puzzle._id}`;

      return (
        <li className="list-group-item" key={puzzle._id}>
          <Link to={url}>Puzzle {puzzle._id}</Link>
          <span>
            <button
              className="btn btn-danger"
              onClick={() => this.onPuzzleRemove(puzzle)}>
              Remove
            </button>
          </span>
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="list-group">
        {this.renderList()}
      </ul>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('puzzles');

  return { puzzles: Puzzles.find({}).fetch() };
}, PuzzlesList);
