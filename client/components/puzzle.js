import React, { Component, PropTypes } from 'react';
import TextArea from './textArea';
import Update from 'immutability-helper';

function isLetter(char) {
  return char.match(/^[A-Za-z]+$/);
}

export default class Puzzle extends Component {
  constructor(props) {
    super(props);
    this.handleQuoteChange = this.handleQuoteChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.validatePuzzle = this.validatePuzzle.bind(this);
    this.continueToNextStep = this.continueToNextStep.bind(this);
    this.handleStepChange = this.handleStepChange.bind(this);
    this.createGrid = this.createGrid.bind(this);
    this.state = {
      isValid: false,
      quote:'',
      indexedQuote: [],
      authorLetters: [],
      quoteLetters: {},
      currentStep: 1
    };
  }
  handleQuoteChange(string) {
    var library = {};
    string.split('').forEach(function(char){
      if (isLetter(char)) {
        if (library[char.toLowerCase()]) {
          library[char.toLowerCase()] += 1;
        } else {
          library[char.toLowerCase()] = 1;
        }
      }
    });
    this.setState({
      quote: string,
      quoteLetters: library
    },function(){
      this.validatePuzzle();
    });
  }
  handleAuthorChange(string) {
    var array = [];
    if (string) {
      string.split('').forEach(function(char){
        if (isLetter(char)) {
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
    if (this.state.authorLetters) {
      this.state.authorLetters.forEach(function(char){
        if (!quoteLettersClone[char] || quoteLettersClone[char] == 0) {
          puzzleValidity = false;
        }
        if (quoteLettersClone[char]) {
          quoteLettersClone[char] -= 1;
        }
      });
    }
    this.setState({isValid:puzzleValidity});
  }

  continueToNextStep(e) {
    $(e.target).hide();
    e.preventDefault();
    var step = this.state.currentStep + 1;
    this.setState({currentStep: step}, function(){
      this.handleStepChange(step);
    });
  }

  handleStepChange(step) {
    if (step == 2) {
      this.createGrid()
    }
  }

  createGrid() {
    var index = 1;
    var tempArray = [];
    this.state.quote.split('').forEach(function(char){
      var letterWithIndex = {};
      if (isLetter(char)) {
        letterWithIndex.letter = char;
        letterWithIndex.index = index;
        index ++;
        tempArray.push(letterWithIndex);
      } else {
        letterWithIndex.letter = char;
        letterWithIndex.index = null;
        tempArray.push(letterWithIndex);
      }
    });
    this.setState({indexedQuote:tempArray},function(){
      console.log(this.state.indexedQuote)
    });
  }

  render() {
    var continueButtonDisabled, quoteConstraintClass, authorConstraintClass, validityConstraintClass

    if (this.state.quote.length) {
      var quoteConstraintClass = "green";
    } else {
      var quoteConstraintClass = "red";
    }

    if (this.state.authorLetters.length) {
      authorConstraintClass = "green";
    } else {
      authorConstraintClass = "red";
    }

    if (this.state.quote.length && this.state.authorLetters.length && this.state.isValid) {
      continueButtonDisabled = false;
      validityConstraintClass = "green";
    } else {
      continueButtonDisabled = true;
      validityConstraintClass = "red";
    }
    return (
      <div className="row">
        <div className="col-xs-12 col-lg-8">
          <h2>Enter a quote and its author</h2>
          <form className="initial-inputs">
            <div className="form-group">
              <label>Please Enter Quote</label>
              <TextArea
                className="quote-input"
                rows="5" handleQuoteChange={this.handleQuoteChange} />
            </div>
            <div className="form-group">
              <label>Please Enter Author</label>
              <TextArea
                className="author-input"
                rows="1"
                handleQuoteChange={this.handleAuthorChange}
                />
            </div>
            <input disabled={continueButtonDisabled} onClick={this.continueToNextStep} className="form-control" type="submit" value="Continue" />
          </form>
        </div>
        <div className="col-xs-12 col-lg-4">
          <h2>Constraints</h2>
          <ul className="constraints">
            <li className={quoteConstraintClass}>Quote not empty</li>
            <li className={authorConstraintClass}>Author not empty</li>
            <li className={validityConstraintClass}>Author name can be made up by letters from the quote</li>
          </ul>
        </div>
      </div>
    );
  }
}
Puzzle.propTypes = {
};
