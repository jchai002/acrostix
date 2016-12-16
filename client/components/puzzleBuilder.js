import React, { Component, PropTypes } from 'react';

class PuzzleBuilder extends Component {
  render() {
    return (
      <div className="container">
        <h1>Puzzle Builder</h1>
        {this.props.children}
      </div>
    );
  }
}

PuzzleBuilder.propTypes = {
}

export default PuzzleBuilder;
