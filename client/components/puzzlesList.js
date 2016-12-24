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
      var stage;
      switch (puzzle.currentStep) {
        case 1:
          stage = 'Quote Entry'
        break;
        case 2:
          stage = 'Words Entry'
        break;
        case 3:
          stage = 'Clues Entry'
        break;
      }
      return (
        <li className="list-group-item" key={puzzle._id}>
        <span>
        <span className="tag tag-success">{stage}</span>
        <Link to={url}>Puzzle {puzzle._id}</Link>
        </span>
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
  Meteor.subscribe('ownPuzzles');
  Meteor.subscribe('publicPuzzles');

  return { puzzles: Puzzles.find({}).fetch() };
}, PuzzlesList);
