import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as letterActions from '../actions/letterActions'
import TextArea from './textArea';
import Grid from './grid';
import Tile from './tile';
import Word from './word';

function isLetter(char) {
  return char.match(/^[A-Za-z]+$/);
}

const Alphabet = "abcdefghijklmnopqrstuvwxyz";
const AlphabetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

class PuzzleBuilder extends Component {
  constructor(props) {
    super(props);
    this.handleQuoteChange = this.handleQuoteChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.validatePuzzle = this.validatePuzzle.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.assignView = this.assignView.bind(this);
    this.createQuoteLetterStorage = this.createQuoteLetterStorage.bind(this);
    this.createWordsTracker = this.createWordsTracker.bind(this);
    this.updateWordComponents = this.updateWordComponents.bind(this);
    this.handleWordChange = this.handleWordChange.bind(this);
    this.handleLetterInput = this.handleLetterInput.bind(this);
    this.handleLetterRemoval = this.handleLetterRemoval.bind(this);
    this.state = {
      isValid: false,
      quote:'',
      quoteLetterStorage: [],
      quoteLetterCounter: {},
      authorLetters: [],
      wordsTracker: {},
      gridComponent: null,
      wordComponents:null,
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
      quoteLetterCounter: library
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
    var quoteLetterCounterClone = Object.assign({}, this.state.quoteLetterCounter);
    var puzzleValidity = true;
    if (this.state.authorLetters) {
      this.state.authorLetters.forEach(function(char){
        if (!quoteLetterCounterClone[char] || quoteLetterCounterClone[char] == 0) {
          puzzleValidity = false;
        }
        if (quoteLetterCounterClone[char]) {
          quoteLetterCounterClone[char] -= 1;
        }
      });
    }
    this.setState({isValid:puzzleValidity});
  }

  nextStep() {
    var newStep = this.state.currentStep + 1;
    if (newStep == 2) {
      this.createQuoteLetterStorage();
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
              <a disabled={continueButtonDisabled} onClick={this.nextStep} className="btn btn-primary" > Continue</a>
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
      var letterCounters = Alphabet.split('').map(function(key) {
        var letterClass = 'letter-'+key;
        if (/[aeiou]/.test(key)) {
          letterClass += " vowels"
        }
        if (!Puzzle.state.quoteLetterCounter[key]) {
          var numberClass = "red"
        }
        return (
          <div key={key} className="tracker">
            <span className={letterClass}>{key}</span>:
              <span className={numberClass}>{Puzzle.state.quoteLetterCounter[key] || 0}</span>
            </div>
          )
        });
        return (
          <div className="row step-2">
            <div className="col-xs-12 col-lg-8 step step-2">
              <Grid />
            </div>
            <div className="col-xs-12 col-lg-4 step step-2">
              <h2>Letters Remaining</h2>
              <div className="trackers">
                {letterCounters}
              </div>
              <a onClick={this.nextStep} className="btn btn-success">Continue</a>
              <div className="words">
                {this.state.wordComponents}
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

    handleWordChange(char,wordId,action,wordComponent) {
      if (action === 'input') {
        var oldWord = this.state.wordsTracker[wordId];
        var newWord = oldWord + char;
        this.state.wordsTracker[wordId] = newWord;
        this.handleLetterInput(char,wordId);
      }
      if (action === 'delete') {
        var oldWord = this.state.wordsTracker[wordId];
        if (oldWord.length > 1){
          var newWord = oldWord.slice(0,-1);
          this.state.wordsTracker[wordId] = newWord;
          this.handleLetterRemoval(char,wordId);
        }
      }
    }

    handleLetterInput(char,wordId) {
      this.state.quoteLetterCounter[char] --;
      for (i in this.state.quoteLetterStorage) {
        var matched = this.state.quoteLetterStorage[i];
        if (matched.letter == char && !matched.wordId) {
          matched.wordId = wordId;
          this.updateWordComponents(char,matched.gridId,wordId);
          break
        }
      }
    }

    handleLetterRemoval(char,wordId) {
      this.state.quoteLetterCounter[char] ++;
      for (var i = this.state.quoteLetterStorage.length - 1; i >= 0;i--) {
        var matched = this.state.quoteLetterStorage[i];
        if (matched.letter == char && matched.wordId == wordId) {
          matched.wordId = null;
          return
        }
      }
    }

    createWordsTracker() {
      const AlphabetArray = Alphabet.toUpperCase().split("");
      const Puzzle = this;
      // create word storage
      var words = {};
      Puzzle.state.authorLetters.forEach(function(char,i){
        var wordId = AlphabetArray[i];
        words[wordId] = char;
      });
      this.setState({wordsTracker:words},function(){
        //input the first letter in word again after word tracker is created
        Puzzle.state.authorLetters.forEach(function(char,i){
          var wordId = AlphabetArray[i];
          words[wordId] = char;
          Puzzle.handleLetterInput(char,wordId);
        });
      });
    }

    updateWordComponents(letter,gridId,wordId) {
      const Puzzle = this;
      var wordComponents = Object.keys(Puzzle.state.wordsTracker).map(function(id,i){
        if (wordId == id) {
          var newChar = {letter:letter,gridId:gridId,wordId:wordId}
        }
        return (
          <Word
            key={id}
            wordId={id}
          />
        );
      });
      this.setState({wordComponents:wordComponents});
    }

    createQuoteLetterStorage() {
      var index = 1;
      var tempArray = [];
      const Puzzle = this;
      Puzzle.state.quote.split('').forEach(function(char){
        var letterInfo = {};
        if (isLetter(char)) {
          letterInfo.letter = char;
          letterInfo.gridId = index;
          Puzzle.props.actions.createLetter({char:char,gridId:index,wordId:null});
          letterInfo.wordId = null;
          index ++;
          tempArray.push(letterInfo);
        } else if (char===' ') {
          Puzzle.props.actions.createLetter({char:char,gridId:index,wordId:null});
          letterInfo.letter = char;
          letterInfo.gridId = null;
          letterInfo.wordId = null;
          tempArray.push(letterInfo);
        }
      });

      Puzzle.setState({quoteLetterStorage:tempArray},function(){
        this.createWordsTracker();
      });
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
  PuzzleBuilder.propTypes = {
    letters: PropTypes.array.isRequired
  };

function mapStateToProps(state, ownProps) {
  return {
    letters: state.letters
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(letterActions,dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PuzzleBuilder);
