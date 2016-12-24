import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gridActions from '../actions/gridActions'
import LetterInput from './letterInput';
import Label from './label';
import _ from 'lodash';

class Word extends Component {
  constructor(props) {
    super(props);
    var wordId = this.props.wordId;
    var initialLetters;
    if (this.props.words[wordId]) {
      initialLetters = [...this.props.words[wordId].letters,
        Object.assign({}, {char:'',wordId:wordId,gridId:''})];
    } else {
      initialLetters = [{char:'',wordId:wordId,gridId:''}];
    }
    this.state = {
      currentLetters:initialLetters,
      lastWordUpdated:false
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    if (e.keyCode === 8 || e.keyCode === 46) {
      let currentLetters = this.props.words[this.props.wordId].letters;
      let length = currentLetters.length;
      if (length > this.props.minLength) {
        let gridId = currentLetters[length-1].gridId;
        this.props.actions.restoreGridLetter({gridId:gridId,wordId:this.props.wordId});
      } else {
        toastr.error('Cannot delete any more letters from this word', 'Ops!');
      }
    }
  }

  componentWillMount() {
    // might need to refactor to avoid state mutation
    if (this.props.noLetterEntryAllowed) {
      this.state.currentLetters.pop();
    }
  }

  componentWillReceiveProps(nextProps) {
    var wordId = this.props.wordId;
    var currentWord = this.props.words[wordId].letters;
    var newWord = nextProps.words[wordId].letters;
    if (currentWord.length != newWord.length) {
      var currentLetters = newWord.map((letter)=>{
        return letter
      });
      currentLetters.push({char:'',wordId:this.props.wordId,gridId:''});
      this.setState({currentLetters:currentLetters,lastWordUpdated:true});
    } else {
      this.setState({lastWordUpdated:false})
    }
  }

  render() {
    const Word = this;
    var letterComponents = this.state.currentLetters.map((letter,i)=>{
      return (
        <LetterInput
          key={i}
          shouldFocus={Word.state.lastWordUpdated}
          wordId={letter.wordId}
          gridId={letter.gridId}
          value={letter.char}
          handleKeyDown={Word.handleKeyDown}
          />
      );
    });
    return (
      <div className="word">
        <Label value={this.props.wordId} />
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
    actions: bindActionCreators(gridActions,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Word);
