import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gridActions from '../../actions/gridActions';
import * as wordActions from '../../actions/wordActions';
import Grid from '../grid'
import Word from '../word'
import BuilderNav from './builderNav';
import LetterTracker from './letterTracker';
import _ from 'lodash';
import * as utils from  '../../helpers/utils';

class WordEntryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGrid: true
    }
    this.toggleGrid = this.toggleGrid.bind(this);
    this.displayLetterCounter = this.displayLetterCounter.bind(this);
    this.getRemainingLetters = this.getRemainingLetters.bind(this);
  }

  toggleGrid() {
    if (this.state.showGrid) {
      this.setState({showGrid:false});
    } else {
      this.setState({showGrid:true});
    }
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
    var lettersRemaining = this.getRemainingLetters();
    var lettersToDisplay = [];
    lettersRemaining.forEach((letter)=>{
      lettersToDisplay.push(letter.char.toUpperCase());
    });
    return <LetterTracker letters={lettersToDisplay} />
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

    var gridDisplay = {};
    if (this.state.showGrid) {
      gridDisplay = {display:'flex'}
    } else {
      gridDisplay = {display:'none'}
    }


    return (
      <div className="container">
        <BuilderNav
          pageComplete={pageComplete} goToNextStep={this.props.goToNextStep}
          nextButtonContent="Next: Enter Clues"
          />
        <div className="row">
          <div className="col-xs-12">
            <button className="btn btn-sm btn-info toggle-grid" onClick={this.toggleGrid}>Toggle Grid</button>
            <Grid puzzle={this.props.puzzle} display={gridDisplay} />
          </div>
          <div className="col-xs-12">
            <h2>Letters Remaining</h2>
            {this.displayLetterCounter()}
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
