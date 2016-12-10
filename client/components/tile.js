import React, { Component, PropTypes } from 'react';
export default class Tile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var letterClass;
    if (this.props.used) {
      letterClass = 'letter red';
    } else {
      letterClass = 'letter';
    }
    return (
      <div className="tile">
        <div className="index">{this.props.index}</div>
        <div className={letterClass}>{this.props.letter}</div>
      </div>
    );
  }
}
Tile.propTypes = {
};
