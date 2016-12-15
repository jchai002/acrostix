import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as letterActions from '../actions/letterActions'
import LetterInput from './letterInput';
import _ from 'lodash';

class Word extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLetters:[{char:'',wordId:this.props.wordId,gridId:''}]
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    if (e.keyCode === 8 || e.keyCode === 46) {
      let wordLength = this.state.currentLetters.length;
      let gridId = this.state.currentLetters[wordLength-2].gridId;
      this.props.actions.restoreLetter({gridId:gridId,wordId:this.props.wordId});
    }
  }

  componentWillReceiveProps(nextProps) {
    // find all the letters that belong to word in store
    var storeLetters = nextProps.letters.filter((letter)=>{
      if (letter.wordId === nextProps.wordId) {
        return letter
      }
    });

    // turn into strings to allow lodash comparason
    var currentLetterStrings = this.state.currentLetters.map((letter)=>{
      return JSON.stringify(letter)
    })
    // get new letter entered
    var newLetter;
    storeLetters.forEach((letter)=>{
      if (!_.includes(currentLetterStrings,JSON.stringify(letter))) {
        return newLetter = letter;
      }
    })
    // if there is new letter for this word
    if (newLetter) {
      // make a deep clone of current state
      var currentLettersClone = [...this.state.currentLetters]
      // replace laster char with new letter
      currentLettersClone.splice(-1,1,newLetter)
      // push another empty input
      currentLettersClone.push({char:'',wordId:this.props.wordId,gridId:''})
      // update current letters
      this.setState({currentLetters:currentLettersClone});
    } else {
      // this is for all words that didn't get input or letter put back event
    }
  }
  render() {
    const Word = this;
    var letterComponents = this.state.currentLetters.map((letter,i)=>{
      return (
        <LetterInput
          key={i}
          wordId={letter.wordId}
          gridId={letter.gridId}
          value={letter.char}
          handleKeyDown={Word.handleKeyDown}
          />
      );
    });

    return (
      <div className="word">
        <div className="label">{this.props.wordId}.</div>
        {letterComponents}
      </div>
    );
  }
}
Word.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Word);
