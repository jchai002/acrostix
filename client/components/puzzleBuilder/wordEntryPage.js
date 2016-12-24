import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gridActions from '../../actions/gridActions';
import * as wordActions from '../../actions/wordActions';
import Grid from '../grid'
import Word from '../word'
import BuilderNav from './builderNav';
import Alphabet from "../../constants/alphabet";
import _ from 'lodash'

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

    componentWillMount() {
      // var currentGrid = this.props.puzzle.grid
      // currentGrid.forEach((letter)=>{
      //   this.props.gridActions.addLetterToGrid(letter);
      // });
      if (_.isEmpty(this.props.words)) {
        // load grid and words from DB
        this.props.wordActions.loadWordsFromDB(this.props.puzzle._id);
        this.props.gridActions.loadGridFromDB(this.props.puzzle._id);
      } else {
        Meteor.call('puzzles.initializeGrid',this.props.puzzle,this.props.grid);
        Meteor.call('puzzles.initializeWords',this.props.puzzle, this.props.words);
      }
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
