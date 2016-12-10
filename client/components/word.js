import React, { Component, PropTypes } from 'react';
export default class Word extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      value:''
    }
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  render() {
    const value = this.state.value;
    return (
      <div className="word">
        <div className="label">{this.props.wordId}.</div>
        <div className="first-letter">
          {this.props.firstLetter}
        </div>
        <input
          value={value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
Word.propTypes = {
};
