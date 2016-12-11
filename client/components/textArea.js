import React, { Component, PropTypes } from 'react';
export default class TextArea extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {value: ''};
  }

  handleChange(e) {
    this.setState({value: e.target.value});
    this.props.handleChange(e.target.value);
  }

  render() {
    const value = this.state.value;
    return (
      <textarea
        value={value}
        className={this.props.className}
        onChange={this.handleChange}
        cols={this.props.cols}
        rows={this.props.rows}
        />
    );
  }
}
TextArea.propTypes = {
};
