import React, { Component, PropTypes } from 'react';

export default class Letter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:this.props.value
    }
  }

  render() {
    const value = this.state.value;
    return (
      <input
        onChange={this.props.handleLetterChange}
        onKeyDown={this.props.handleKeyDown}
        className="letter"
        maxLength='1'
        value={value}
        disabled={value}
        />
    );
  }
}
Letter.propTypes = {
};
