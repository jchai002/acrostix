import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Grid from '../grid'
import Word from '../word'
import Alphabet from "../../constants/alphabet";

class WordEntryPage extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    var dictionary = {};
    var lettersRemaining = [];
    for (var key in this.props.letters) {
      var letter = this.props.letters[key];
      if (!letter.wordId) {
        lettersRemaining.push(letter);
      }
    }
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
      })
      return (
        <div className="row">
          <div className="col-xs-12 col-lg-6">
            <Grid />
          </div>
          <div className="col-xs-12 col-lg-6">
            <h2>Letters Remaining</h2>
            <div className="trackers">
              {letterCounters}
            </div>
            <div className="words">
              {wordComponents}
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
      letters: state.letters,
      words: state.words
    };
  }

  export default connect(mapStateToProps)(WordEntryPage);
