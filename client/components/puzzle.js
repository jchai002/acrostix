import React, { Component, PropTypes } from 'react';
import TextArea from './textArea';
import Tile from './tile';
import Word from './word';
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
    this.createWordRows = this.createWordRows.bind(this);
    this.state = {
      isValid: false,
      quote:'',
      indexedQuoteLetters: [],
      authorLetters: [],
      quoteLetters: {},
      gridComponent: null,
      wordsComponent:null,
      currentStep: 1,
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
    // $('.step-1').hide();
    e.preventDefault();
    var step = this.state.currentStep + 1;
    this.setState({currentStep: step}, function(){
      this.handleStepChange(step);
    });
  }

  handleStepChange(step) {
    if (step == 2) {
      this.createGrid();
      this.createWordRows()
    }
  }

  createWordRows() {
    const Alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
    var words = this.state.authorLetters.map(function(char,i){
      return (
        <Word
          key={i}
          wordId={Alphabet[i]}
          firstLetter={char}
        />
      );
    });
    this.setState({wordsComponent:words})
  }

  createGrid() {
    var index = 1;
    var tempArray = [];
    var grid;
    const Puzzle = this;
    Puzzle.state.quote.split('').forEach(function(char){
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

    while (tempArray.length%10 != 0) {
      tempArray.push({letter:' ',index: null});
    }
    Puzzle.setState({indexedQuoteLetters:tempArray},function(){
      grid = tempArray.map(function(obj,i){
        return (<Tile key={i} letter={obj.letter} index={obj.index}/>);
      });
      Puzzle.setState({gridComponent:grid});
    });
  }

  render() {
    var continueButtonDisabled, quoteConstraintClass, authorConstraintClass, validityConstraintClass;

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
        <div className="col-xs-12 col-lg-8 step-1">
          <h2>Enter a quote and its author</h2>
          <form>
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
        <div className="col-xs-12 col-lg-4 step-1">
          <h2>Constraints</h2>
          <ul className="constraints">
            <li className={quoteConstraintClass}>Quote not empty</li>
            <li className={authorConstraintClass}>Author not empty</li>
            <li className={validityConstraintClass}>Author name can be made up by letters from the quote</li>
          </ul>
        </div>
        <div className="col-xs-12 col-lg-8 step-2">
          <div className="grid">
            {this.state.gridComponent}
          </div>
        </div>
        <div className="col-xs-12 col-lg-4 step-2">
          <div className="words">
            {this.state.wordsComponent}
          </div>
        </div>
      </div>
    );
  }
}
Puzzle.propTypes = {
};
