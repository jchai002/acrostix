import React, { Component, PropTypes } from 'react';

// should be stateless Component
export default class Tile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var letterClass, tileClass;
    if (this.props.wordId) {
      letterClass = 'letter red';
    } else {
      letterClass = 'letter';
    }
    if (this.props.gridId) {
      tileClass = 'tile';
    } else {
      tileClass = 'tile white bg-black';
    }
    return (
      <div className={tileClass}>
        <div className="word-id">{this.props.wordId}</div>
        <div className="letter-number">{this.props.gridId}</div>
        <div className={letterClass}>{this.props.char}</div>
      </div>
    );
  }
}
Tile.propTypes = {
};
