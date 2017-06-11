import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Puzzles } from '../../collections/puzzles';
import { Link } from 'react-router';
import _ from 'lodash';

class PuzzlesList extends Component {
  onPuzzleRemove(puzzle) {
    Meteor.call('puzzles.remove', puzzle);
  }

  renderList() {
    var list = this.props.puzzles.map(puzzle => {
      const url = `/puzzles/${puzzle._id}`;
      var stage, stageCss, visibility, visibilityCss;
      switch (puzzle.currentStep) {
        case 1:
        stage = 'Quote Entry'
        stageCss = 'badge badge-default'
        break;
        case 2:
        stage = 'Words Entry'
        stageCss = 'badge badge-danger'
        break;
        case 3:
        stage = 'Clues Entry'
        stageCss = 'badge badge-warning'
        case 4:
        stage = 'Review & Print'
        stageCss = 'badge badge-success'
        break;
      }

      if (puzzle.public) {
        visibility = 'public';
        visibilityCss = 'badge badge-info'
      } else {
        visibility = 'private'
        visibilityCss = 'badge badge-primary'
      }

      return (
        <li className="list-group-item" key={puzzle._id}>
          <span>
            <span className={visibilityCss}>{visibility}</span>
            <span className={stageCss}>{stage}</span>
            <Link to={url}>{puzzle.name}</Link>
          </span>
          <span>
            <span className="moment">Created {moment(puzzle.createdAt).fromNow()}</span>
            <button
              className="btn btn-danger"
              onClick={() => this.onPuzzleRemove(puzzle)}>
              Remove
            </button>
          </span>
        </li>
      );
    });

    return _.sortBy(list, 'createdAt').reverse();

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
