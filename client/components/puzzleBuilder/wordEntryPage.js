import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gridActions from '../../actions/gridActions';
import * as wordActions from '../../actions/wordActions';
import Grid from '../grid'
import Word from '../word'
import BuilderNav from './builderNav';
import Alphabet from "../../constants/alphabet";
import _ from 'lodash';
import * as utils from  '../../helpers/utils';

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
      if (utils.isLetter(letter.char) && !letter.wordId) {
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

    componentWillMount() {
      if (_.isEmpty(this.props.grid) && _.isEmpty(this.props.words)) {
        this.props.gridActions.loadGridFromDB(this.props.puzzle._id);
        this.props.wordActions.loadWordsFromDB(this.props.puzzle._id);
      } else {
        var words = this.props.words;
        if (words[Object.keys(words)[0]].letters.length == 0) {
          this.props.grid.forEach((letter) => {
            if (letter.wordId) {
              this.props.wordActions.addLetterToWord(letter);
            }
          })
        }
      }
    }

    componentDidUpdate() {
      Meteor.call('puzzles.updateGrid',this.props.puzzle,this.props.grid)
      Meteor.call('puzzles.updateWords',this.props.puzzle,this.props.words)
    }

    render() {
      var letterCounters = this.displayLetterCounter();
      var wordIds = [];
      for (var wordId in this.props.words) {
        wordIds.push(wordId)
      }
      var wordComponents = wordIds.map((id)=>{
        // TODO set min length to 0 if there is no author name requirement
        return (
          <Word
            key={id}
            wordId={id}
            minLength={1}
            />
        );
      });
      var pageComplete = !this.getRemainingLetters().length;
      return (
        <div className="container">
          <BuilderNav
            pageComplete={pageComplete} goToNextStep={this.goToNextStep}
            goToPrevStep={this.props.goToPrevStep}
            />
          <div className="row">
            <div className="col-xs-12">
              <Grid puzzle={this.props.puzzle} />
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

  function mapDispatchToProps(dispatch) {
    return {
      gridActions: bindActionCreators(gridActions,dispatch),
      wordActions: bindActionCreators(wordActions,dispatch)
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(WordEntryPage);
