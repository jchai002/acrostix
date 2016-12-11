import React, { Component, PropTypes } from 'react';

export default class Letter extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      value:this.props.value
    }
  }

  handleChange(e) {
    this.props.handleLetterChange(e);
  }

  render() {
    const value = this.state.value;
    return (
      <input
        onChange={this.handleChange}
        className="letter"
        maxLength='1'
        value={value}
        />
    );
  }
}
Letter.propTypes = {
};
