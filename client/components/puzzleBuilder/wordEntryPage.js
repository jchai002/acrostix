import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Grid from '../grid'
import Word from '../word'
import NavBar from '../navBar';
import Alphabet from "../../constants/alphabet";

class WordEntryPage extends Component {
  constructor(props) {
    super(props);
    this.displayLetterCounter = this.displayLetterCounter.bind(this);
    this.getRemainingLetters = this.getRemainingLetters.bind(this);
    this.goToNextStep = this.goToNextStep.bind(this);
  }

  getRemainingLetters() {
    var lettersRemaining = [];
    for (var key in this.props.grid) {
      var letter = this.props.grid[key];
      if (!letter.wordId) {
        lettersRemaining.push(letter);
      }
    }
    return lettersRemaining
  }

  displayLetterCounter() {
    var dictionary = {};
    var lettersRemaining = this.getRemainingLetters()
    lettersRemaining.forEach((letter)=>{
      var char = letter.char.toUpperCase();
      if (dictionary[char]) {
        dictionary[char] ++
      } else {
        dictionary[char] = 1
      }
    });
    var letterCounters = Alphabet.split('').map((char) => {
      var letterClass = 'letter-'+char;
      if (/[aeiou]/.test(char)) {
        letterClass += " vowels"
      }
      if (!dictionary[char]) {
        var numberClass = "red"
      }
      return (
        <div key={char} className="tracker">
          <span className={letterClass}>{char}</span>:
            <span className={numberClass}>{dictionary[char] || 0}</span>
          </div>
        )
      });

      return letterCounters
    }

    goToNextStep() {
      // save clues here
      this.props.goToNextStep()
    }


    render() {
      var letterCounters = this.displayLetterCounter();
      var wordIds = [];
      for (var wordId in this.props.words) {
        wordIds.push(wordId)
      }
      var wordComponents = wordIds.map((id)=>{
        return (
          <Word
            key={id}
            wordId={id}
            />
        );
      });
      var pageComplete = !this.getRemainingLetters().length;
      return (
        <div className="container">
          <NavBar pageComplete={pageComplete} goToNextStep={this.goToNextStep} />
          <div className="row">
            <div className="col-xs-12">
              <Grid />
            </div>
            <div className="col-xs-12">
              <h2>Letters Remaining</h2>
              <div className="trackers">
                {letterCounters}
              </div>
              <div className="words">
                {wordComponents}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  WordEntryPage.propTypes = {
  };

  function mapStateToProps(state, ownProps) {
    return {
      grid: state.grid,
      words: state.words
    };
  }

  export default connect(mapStateToProps)(WordEntryPage);
