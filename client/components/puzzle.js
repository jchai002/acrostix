import React, { Component, PropTypes } from 'react';
import TextArea from './textArea';
import Tile from './tile';
import Word from './word';

function isLetter(char) {
  return char.match(/^[A-Za-z]+$/);
}

const Alphabet = "abcdefghijklmnopqrstuvwxyz";

export default class Puzzle extends Component {
  constructor(props) {
    super(props);
    this.handleQuoteChange = this.handleQuoteChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.validatePuzzle = this.validatePuzzle.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.assignView = this.assignView.bind(this);
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
      lastLetterIndex:null,
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

  nextStep(e) {
    e.preventDefault();
    var newStep = this.state.currentStep + 1;
    if (newStep == 2) {
      this.createGrid();
    }
    this.setState({currentStep: newStep});
  }

  assignView() {
    const Puzzle = this;
    switch(Puzzle.state.currentStep) {
      case 1:
      var continueButtonDisabled, quoteConstraintClass, authorConstraintClass, validityConstraintClass;
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
      return (
        <div className="row">
          <div className="col-xs-12 col-lg-8 step step-1">
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
              <input disabled={continueButtonDisabled} onClick={this.nextStep} className="form-control" type="submit" value="Continue" />
            </form>
          </div>
          <div className="col-xs-12 col-lg-4 step step-1">
            <h2>Constraints</h2>
            <ul className="constraints">
              <li className={quoteConstraintClass}>Quote is not empty</li>
              <li className={authorConstraintClass}>Author is not empty</li>
              <li className={validityConstraintClass}>Author name can be made up by letters from the quote</li>
            </ul>
          </div>
        </div>
      );
      case 2:
      var letterTrackers = Alphabet.split('').map(function(key) {
        var letterClass = 'letter-'+key;
        if (/[aeiou]/.test(key)) {
          letterClass += " vowels"
        }
        if (!Puzzle.state.quoteLetterTracker[key]) {
          var numberClass = "red"
        }
        return (
          <div key={key} className="tracker">
            <span className={letterClass}>{key}</span>:
              <span className={numberClass}>{Puzzle.state.quoteLetterTracker[key] || 0}</span>
            </div>
          )
        });
        return (
          <div className="row step-2">
            <div className="col-xs-12 col-lg-8 step step-2">
              <div className="grid">
                {this.state.gridComponent}
              </div>
            </div>
            <div className="col-xs-12 col-lg-4 step step-2">
              <h2>Letters Remaining</h2>
              <div className="trackers">
                {letterTrackers}
              </div>
              <a onClick={this.nextStep} className="btn btn-success">Continue</a>
              <div className="words">
                {this.state.wordsComponent}
              </div>
            </div>
          </div>
        );

        case 3:
        return (
          <div className="row step-3">
            <div className="col-xs-12">
              <h2>Enter Clues For Each Word</h2>
            </div>
          </div>
        );
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
      this.state.quoteLetterTracker[char] --;
      for (i in this.state.quoteLetterStorage) {
        var obj = this.state.quoteLetterStorage[i];
        if (obj.letter == char && !obj.wordId) {
          obj.wordId = wordId;
          this.updateGrid(this.state.quoteLetterStorage);
          this.setState({lastLetterIndex:          obj.index});
          break
        }
      }
    }

    handleLetterRemoval(char,wordId) {
      this.state.quoteLetterTracker[char] ++;
      for (var i = this.state.quoteLetterStorage.length - 1; i >= 0;i--) {
        var obj = this.state.quoteLetterStorage[i];
        if (obj.letter == char && obj.wordId == wordId) {
          obj.wordId = null;
          this.updateGrid(this.state.quoteLetterStorage);
          this.setState({lastLetterIndex:          obj.index});
          return
        }
      }
    }

    componentDidUpdate() {
      console.log(this.state.lastLetterIndex)
    }

    createWordRows() {
      const AlphabetArray = Alphabet.toUpperCase().split("");
      const Puzzle = this;
      // create word storage
      var words = {};
      Puzzle.state.authorLetters.forEach(function(char,i){
        var wordId = AlphabetArray[i];
        words[wordId] = char;
        Puzzle.handleLetterInput(char,wordId);
      });
      this.setState({wordStorage:words})

      // create words Component
      var wordsComponent = Puzzle.state.authorLetters.map(function(char,i){
        return (
          <Word
            key={i}
            wordId={AlphabetArray[i]}
            firstLetter={char}
            lastLetterIndex={Puzzle.state.lastLetterIndex}
            outOfLetter = {Puzzle.outOfLetter}
            letterTracker = {Puzzle.state.quoteLetterTracker}
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

    outOfLetter(char) {
      var $tracker = $('.letter-'+char).parent();
      $tracker.addClass('animated rubberBand');
      setTimeout(function(){
        $tracker.removeClass('animated rubberBand');
      },2000);
    }

    render() {
      var view = this.assignView();
      return (
        <div className="container">
          {view}
        </div>
      );
    }
  }
  Puzzle.propTypes = {
  };
