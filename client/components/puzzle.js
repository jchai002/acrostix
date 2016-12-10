import React, { Component, PropTypes } from 'react';
import TextArea from './textArea';
import Update from 'immutability-helper';

export default class Puzzle extends Component {
  constructor(props) {
    super(props);
    this.handleQuoteChange = this.handleQuoteChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.state = {
      author:'',
      isValid:false,
      quoteLetters:{},
    };
  }
  handleQuoteChange(str) {
    var lib = {};
    str.split('').forEach(function(char){
      if (char.match(/^[A-Za-z]+$/)) {
        if (lib[char.toLowerCase()]) {
          lib[char.toLowerCase()] += 1;
        } else {
          lib[char.toLowerCase()] = 1;
        }
      }
    });
    this.setState({quoteLetters: lib},function(){
      console.log(this.state.quoteLetters)
    });
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
