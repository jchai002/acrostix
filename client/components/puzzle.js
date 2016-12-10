import React, { Component, PropTypes } from 'react';
import TextArea from './textArea';
import update from 'immutability-helper';

export default class Puzzle extends Component {
  constructor(props) {
    super(props);
    this.handleQuoteChange = this.handleQuoteChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.state = {
      quote:'',
      author:'',
      isValid:false,
      letterStorage:{},
    };
  }
  handleQuoteChange(str) {
    this.setState({quote: str});
    this.setState()
  }
  handleAuthorChange(str) {
    this.setState({author: str});
  }
  render() {
    return (
      <form className="initial-inputs">
        <div className="form-group">
          <label>Please Enter Quote</label>
          <TextArea
            className="quote-input"
            cols="40"
            rows="5"
            handleQuoteChange={this.handleQuoteChange}
            />
        </div>
        <div className="form-group">
          <label>Please Enter Author</label>
          <TextArea
            className="author-input"
            cols="40"
            rows="1"
            handleQuoteChange={this.handleAuthorChange}
            />
        </div>
      </form>
    );
  }
}
Puzzle.propTypes = {
};
