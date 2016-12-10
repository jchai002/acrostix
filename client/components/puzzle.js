import React, { Component, PropTypes } from 'react';
export default class Puzzle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote:'',
      author:'',
      isValid:false,
      letterStorage:{},
    };
  }
  render() {
    return (
      <div>
        puzzle
      </div>
    );
  }
}
Puzzle.propTypes = {
};
