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
  }

  // handleKeyDown(e) {
  //   if (e.keyCode === 8 || e.keyCode === 46) {
  //     this.handleLetterDelete();
  //   }
  // }
  //
  // handleLetterDelete() {
  //   if (this.state.letters.length === 1) {
  //     return
  //   }
  //   const Word = this;
  //   const deletedChar = Word.state.letters.split('').pop();
  //   const newLetterState = Word.state.letters.slice(0, -1);
  //   Word.setState({letters:newLetterState},function(){
  //     Word.props.handleWordChange(deletedChar,Word.props.wordId,'delete');
  //     Word.updateLetters();
  //   });
  // }



  componentWillReceiveProps(nextProps) {
    // find all the letters that belong to word
    var newLetters = nextProps.letters.filter((letter)=>{
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
    newLetters.forEach((letter)=>{
      if (!_.includes(currentLetterStrings,JSON.stringify(letter))) {
        return newLetter = letter;
      }
    })
    // make a deep clone of current state
    var currentLettersClone = [...this.state.currentLetters]
    // replace laster char with new letter
    currentLettersClone.splice(-1,1,newLetter)
    // push another empty input
    currentLettersClone.push({char:'',wordId:nextProps.wordId,gridId:''})
    // update current letters
    this.setState({currentLetters:currentLettersClone});
  }

  render() {
    var letterComponents = this.state.currentLetters.map((letter,i)=>{
      return (
        <LetterInput
          key={i}
          wordId={letter.wordId}
          gridId={letter.gridId}
          value={letter.char}
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
