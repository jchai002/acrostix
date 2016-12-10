import React, { Component, PropTypes } from 'react';
import TextArea from './textArea';
import Update from 'immutability-helper';

export default class Puzzle extends Component {
  constructor(props) {
    super(props);
    this.handleQuoteChange = this.handleQuoteChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.validatePuzzle = this.validatePuzzle.bind(this);
    this.state = {
      isValid:false,
      authorLetters:[],
      quoteLetters:{}
    };
  }
  handleQuoteChange(string) {
    var library = {};
    string.split('').forEach(function(char){
      if (char.match(/^[A-Za-z]+$/)) {
        if (library[char.toLowerCase()]) {
          library[char.toLowerCase()] += 1;
        } else {
          library[char.toLowerCase()] = 1;
        }
      }
    });
    this.setState({quoteLetters: library},function(){
    });
  }
  handleAuthorChange(string) {
    var array = [];
    string.split('').forEach(function(char){
      if (char.match(/^[A-Za-z]+$/)) {
        array.push(char.toLowerCase());
      }
    });
    this.setState({authorLetters: array},function(){
      this.validatePuzzle();
    });
  }
  validatePuzzle() {
    var quoteLettersClone = Object.assign({}, this.state.quoteLetters);
    var puzzleValidity = true;
    this.state.authorLetters.forEach(function(char){
      if (!quoteLettersClone[char] || quoteLettersClone[char] == 0) {
        puzzleValidity = false;
      }
      if (quoteLettersClone[char]) {
        quoteLettersClone[char] -= 1;
      }
    });
    this.setState({isValid:puzzleValidity});
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
