import React, { Component, PropTypes } from 'react';
import TextArea from './textArea';
import Update from 'immutability-helper';

export default class Puzzle extends Component {
  constructor(props) {
    super(props);
    this.handleQuoteChange = this.handleQuoteChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.validatePuzzle = this.validatePuzzle.bind(this);
    this.continueToNextStep = this.continueToNextStep.bind(this);
    this.state = {
      isValid: false,
      authorLetters: [],
      quoteLetters: null,
      currentStep: 1
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
      this.validatePuzzle();
    });
  }
  handleAuthorChange(string) {
    var array = [];
    if (string) {
      string.split('').forEach(function(char){
        if (char.match(/^[A-Za-z]+$/)) {
          array.push(char.toLowerCase());
        }
      });
    }
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

  continueToNextStep(e) {
    e.preventDefault();
    var step = this.state.currentStep + 1;
    this.setState({currentStep: step});
  }

  render() {
    var authorInputClass = 'form-group';
    if (this.state.quoteLetters  && this.state.authorLetters && !this.state.isValid) {
      authorInputClass = 'form-group has-error';
    }
    return (
      <form className="initial-inputs">
        <div className="form-group">
          <label>Please Enter Quote</label>
          <TextArea className="quote-input" cols="40" rows="5" handleQuoteChange={this.handleQuoteChange} />
        </div>
        <div className={authorInputClass}>
          <label>Please Enter Author</label>
          <TextArea
            className="author-input"
            cols="40"
            rows="1"
            handleQuoteChange={this.handleAuthorChange}
            />
          <small className="error-message">This puzzle is invalid, the author's name cannot be made up by letters from the quote</small>
        </div>
        <input onClick={this.continueToNextStep} className="form-control" type="submit" value="Continue" />
      </form>
    );
  }
}
Puzzle.propTypes = {
};
