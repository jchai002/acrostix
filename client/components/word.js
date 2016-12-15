import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as letterActions from '../actions/letterActions'
import LetterInput from './letterInput';
import _ from 'lodash';

class Word extends Component {
  constructor(props) {
    super(props);
    this.state = {currentLetters:[{char:'',wordId:this.props.wordId,gridId:''}]}
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    if (e.keyCode === 8 || e.keyCode === 46) {
      let currentWord = this.props.words[this.props.wordId]
      let length = currentWord.length;
      let gridId = currentWord[length-1].gridId;
      this.props.actions.restoreLetter({gridId:gridId,wordId:this.props.wordId});
    }
  }

  componentWillReceiveProps(nextProps) {
    var wordId = this.props.wordId;
    var currentWord = this.props.words[wordId];
    var newWord = nextProps.words[wordId];
    if (this.props.words[wordId].length != nextProps.words[wordId]) {
      var currentLetters = nextProps.words[wordId].map((letter)=>{
        return letter
      });
      currentLetters.push({char:'',wordId:this.props.wordId,gridId:''});
      this.setState({currentLetters});
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
    words: state.words
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(letterActions,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Word);
