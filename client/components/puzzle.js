import React, { Component, PropTypes } from 'react';
import TextArea from './textArea';

export default class Puzzle extends Component {
  constructor(props) {
    super(props);
    this.handleQuoteChange = this.handleQuoteChange.bind(this);
    this.state = {
      quote:'',
      author:'',
      isValid:false,
      letterStorage:{},
    };
  }
  handleQuoteChange(str) {
    this.setState({quote: str});
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
            handleQuoteChange={this.handleQuoteChange}
            />
        </div>
      </form>
    );
  }
}
Puzzle.propTypes = {
};
