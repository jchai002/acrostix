import React, { Component, PropTypes } from 'react';
import TextArea from './textArea';
import Tile from './tile';
import Word from './word';

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
    this.updateGrid = this.updateGrid.bind(this);
    this.createWordRows = this.createWordRows.bind(this);
    this.handleWordChange = this.handleWordChange.bind(this);
    this.handleLetterInput = this.handleLetterInput.bind(this);
    this.handleLetterRemoval = this.handleLetterRemoval.bind(this);
    this.state = {
      isValid: false,
      quote:'',
      quoteLetterStorage: [],
      quoteLetterTracker: {},
      authorLetters: [],
      wordStorage: {},
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
      quoteLetterTracker: library
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
    var quoteLetterTrackerClone = Object.assign({}, this.state.quoteLetterTracker);
    var puzzleValidity = true;
    if (this.state.authorLetters) {
      this.state.authorLetters.forEach(function(char){
        if (!quoteLetterTrackerClone[char] || quoteLetterTrackerClone[char] == 0) {
          puzzleValidity = false;
        }
        if (quoteLetterTrackerClone[char]) {
          quoteLetterTrackerClone[char] -= 1;
        }
      });
    }
    this.setState({isValid:puzzleValidity});
  }

  continueToNextStep(e) {
    e.preventDefault();
    var step = this.state.currentStep + 1;
    this.setState({currentStep: step}, function(){
      this.handleStepChange(step);
    });
  }

  handleStepChange(step) {
    if (step == 2) {
      $('.step-1').hide();
      $('.step-2').show();
      this.createGrid();
    }
  }

  handleWordChange(char,wordId,action) {
    if (action === 'input') {
      var oldWord = this.state.wordStorage[wordId];
      var newWord = oldWord + char;
      this.state.wordStorage[wordId] = newWord;
      this.handleLetterInput(char,wordId);
    }
    if (action === 'delete') {
      var oldWord = this.state.wordStorage[wordId];
      if (oldWord.length > 1){
        var newWord = oldWord.slice(0,-1);
        this.state.wordStorage[wordId] = newWord;
        this.handleLetterRemoval(char,wordId);
      }
    }
  }

  handleLetterInput(char,wordId) {
    for (i in this.state.quoteLetterStorage) {
      var pointer = this.state.quoteLetterStorage[i];
      if (pointer.letter == char && !pointer.wordId) {
        pointer.wordId = wordId;
        this.updateGrid(this.state.quoteLetterStorage);
        break
      }
    }
  }

  handleLetterRemoval(char,wordId) {
    for (var i = this.state.quoteLetterStorage.length - 1; i >= 0;i--) {
      var pointer = this.state.quoteLetterStorage[i];
      if (pointer.letter == char && pointer.wordId == wordId) {
        pointer.wordId = null;
        this.updateGrid(this.state.quoteLetterStorage);
        return
      }
    }
  }

  createWordRows() {
    const Alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
    const Puzzle = this;
    // create word storage
    var words = {};
    Puzzle.state.authorLetters.forEach(function(char,i){
      var wordId = Alphabet[i];
      words[wordId] = char;
      Puzzle.handleLetterInput(char,wordId);
    });
    this.setState({wordStorage:words})

    // create words Component
    var wordsComponent = Puzzle.state.authorLetters.map(function(char,i){
      return (
        <Word
          key={i}
          wordId={Alphabet[i]}
          firstLetter={char}
          handleWordChange={Puzzle.handleWordChange}
        />
      );
    });
    this.setState({wordsComponent:wordsComponent});
  }

  createGrid() {
    var index = 1;
    var tempArray = [];
    var grid;
    const Puzzle = this;
    Puzzle.state.quote.split('').forEach(function(char){
      var letterInfo = {};
      if (isLetter(char)) {
        letterInfo.letter = char;
        letterInfo.index = index;
        letterInfo.wordId = null;
        index ++;
        tempArray.push(letterInfo);
      } else {
        letterInfo.letter = char;
        letterInfo.index = null;
        letterInfo.wordId = null;
        tempArray.push(letterInfo);
      }
    });

    while (tempArray.length%10 != 0) {
      tempArray.push({letter:' '});
    }
    Puzzle.setState({quoteLetterStorage:tempArray},function(){
      Puzzle.updateGrid(Puzzle.state.quoteLetterStorage);
      // create word rows after the quoteLetterStorage is set
      Puzzle.createWordRows();
    });
  }

  updateGrid(indexedLetters) {
    grid = indexedLetters.map(function(obj,i){
      return (
        <Tile
          key={i}
          letter={obj.letter}
          index={obj.index}
          wordId={obj.wordId}
        />
      );
    });
    this.setState({gridComponent:grid});
  }

  render() {
    var continueButtonDisabled, quoteConstraintClass, authorConstraintClass, validityConstraintClass;
    const Puzzle = this;
    if (Puzzle.state.quote.length) {
      var quoteConstraintClass = "green";
    } else {
      var quoteConstraintClass = "red";
    }

    if (Puzzle.state.authorLetters.length) {
      authorConstraintClass = "green";
    } else {
      authorConstraintClass = "red";
    }

    if (Puzzle.state.quote.length && Puzzle.state.authorLetters.length && Puzzle.state.isValid) {
      continueButtonDisabled = false;
      validityConstraintClass = "green";
    } else {
      continueButtonDisabled = true;
      validityConstraintClass = "red";
    }

    var letterTrackers = Object.keys(this.state.quoteLetterTracker).sort().map(function(key) {
      var letterClass, numberClass;
      if (/[aeiou]/.test(key)) {
        letterClass = "vowels"
      }
      return (
        <div className="tracker">
          <span className={letterClass}>{key}</span>:
          <span className={numberClass}>{Puzzle.state.quoteLetterTracker[key]}</span>
        </div>
      )
    });
    return (
      <div className="row">
        <div className="col-xs-12 col-lg-8 step-1">
          <h2>Enter a quote and its author</h2>
          <form>
            <div className="form-group">
              <label>Please Enter Quote</label>
              <TextArea
                className="quote-input"
                rows="5"
                handleChange={this.handleQuoteChange} />
            </div>
            <div className="form-group">
              <label>Please Enter Author</label>
              <TextArea
                className="author-input"
                rows="1"
                maxLength="26"
                handleChange={this.handleAuthorChange}
                />
            </div>
            <input disabled={continueButtonDisabled} onClick={this.continueToNextStep} className="form-control" type="submit" value="Continue" />
          </form>
        </div>
        <div className="col-xs-12 col-lg-4 step-1">
          <h2>Constraints</h2>
          <ul className="constraints">
            <li className={quoteConstraintClass}>Quote is not empty</li>
            <li className={authorConstraintClass}>Author is not empty</li>
            <li className={validityConstraintClass}>Author name can be made up by letters from the quote</li>
          </ul>
        </div>
        <div className="col-xs-12 col-lg-8 step-2">
          <div className="grid">
            {this.state.gridComponent}
          </div>
        </div>
        <div className="col-xs-12 col-lg-4 step-2">
          <h2>Letters Remaining</h2>
          <div className="trackers">
            {letterTrackers}
          </div>
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
