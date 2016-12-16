import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Grid from '../grid'
import Word from '../word'

const Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

class WordEntryPage extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    var dictionary = {};
    this.props.letters.forEach((letter)=>{
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

      console.log(this.props.words)

      // var wordComponents = this.props.words.map((word)=>{
      //   // return (
      //   //   <Word
      //   //     key={id}
      //   //     wordId={id}
      //   //   />
      //   // );
      // })
    return (
      <div className="row">
        <div className="col-xs-12 col-lg-7">
          <Grid />
        </div>
        <div className="col-xs-12 col-lg-5">
          <h2>Letters Remaining</h2>
            <div className="trackers">
              {letterCounters}
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
