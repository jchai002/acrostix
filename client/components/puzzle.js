import React, { Component, PropTypes } from 'react';
import Input from './input';

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
    console.log(this.state.quote);
  }
  render() {
    return (
      <div>
        <Input
          className="quote-input"
          handleQuoteChange={this.handleQuoteChange}
          />
      </div>
    );
  }
}
Puzzle.propTypes = {
};
