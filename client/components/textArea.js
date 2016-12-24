import React, { Component, PropTypes } from 'react';
export default class TextArea extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {value: ''};
  }

  componentWillMount() {
    if (this.props.value) {
      this.setState({value: this.props.value})
    }
  }

  handleChange(e) {
    this.setState({value: e.target.value});
    this.props.handleChange(e.target.value,this.props.wordId);
  }

  render() {
    const value = this.state.value;
    if (this.props.maxLength) {
      var charCount = <small className="remaining">{this.props.maxLength - this.state.value.length} characters remaining</small>
    }
    return (
      <div className="textarea">
        <textarea
          value={value}
          maxLength={this.props.maxLength}
          className={this.props.className}
          onChange={this.handleChange}
          cols={this.props.cols}
          rows={this.props.rows}
          />
        {charCount}
      </div>
    );
  }
}
TextArea.propTypes = {
};
