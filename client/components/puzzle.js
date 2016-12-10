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
      <div>
        <TextArea
          className="quote-input"
          cols="40"
          rows="5"
          handleQuoteChange={this.handleQuoteChange}
          />
      </div>
    );
  }
}
Puzzle.propTypes = {
};
