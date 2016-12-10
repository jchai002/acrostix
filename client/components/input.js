import React, { Component, PropTypes } from 'react';
export default class Input extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {value: ''};
  }

  handleChange(e) {
    this.setState({value: e.target.value});
    this.props.handleQuoteChange(this.state.value);
  }

  render() {
    const value = this.state.value;
    return (
      <input
        className={this.props.className}
        value={value}
        onChange={this.handleChange} />
    );
  }
}
Input.propTypes = {
};
