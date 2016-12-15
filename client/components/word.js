import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as letterActions from '../actions/letterActions'
import LetterInput from './letterInput';

class Word extends Component {
  constructor(props) {
    super(props);
    this.handleLetterChange = this.handleLetterChange.bind(this);
    this.handleLetterInput = this.handleLetterInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleLetterDelete = this.handleLetterDelete.bind(this);
    this.updateLetters = this.updateLetters.bind(this);
    this.state = {
      letterComponents:<LetterInput
        wordId={this.props.wordId} value='' />
    }
  }

  handleLetterChange(e) {
    var char = e.target.value;
    if (char && this.props.letterCounters[char] > 0) {
      this.handleLetterInput(char);
    } else {
      this.props.outOfLetter(char);
    }
  }

  handleLetterInput(char) {
    // var letters;
    // const Word = this;
    // const newLetterState = Word.state.letters + char;
    // Word.setState({letters:newLetterState},function(){
    //   Word.props.handleWordChange(char,Word.props.wordId,'input');
    //   this.updateLetters();
    // });
  }

  handleKeyDown(e) {
    if (e.keyCode === 8 || e.keyCode === 46) {
      this.handleLetterDelete();
    }
  }

  handleLetterDelete() {
    if (this.state.letters.length === 1) {
      return
    }
    const Word = this;
    const deletedChar = Word.state.letters.split('').pop();
    const newLetterState = Word.state.letters.slice(0, -1);
    Word.setState({letters:newLetterState},function(){
      Word.props.handleWordChange(deletedChar,Word.props.wordId,'delete');
      Word.updateLetters();
    });
  }

  updateLetters() {
    const Word = this;
    var letters = Word.state.letters.split('').map(function(char,i){
      return(
        <LetterInput
          wordId={Word.wordId}
          key={i}
          value={char}
          handleLetterChange={Word.handleLetterChange}
          handleKeyDown={Word.handleKeyDown}
          />
      );
    });
    letters.push(<LetterInput
      wordId={Word.wordId} key='last' value='' handleLetterChange={Word.handleLetterChange} handleKeyDown={Word.handleKeyDown}/>);
      this.setState({letterComponents:letters});
    }

    componentWillReceiveProps(nextProps) {
      var wordLetters = nextProps.letters.filter((letter)=>{
        if (letter.wordId === nextProps.wordId) {
          return letter
        }
      });
      console.log(nextProps)
      var letterComponents = wordLetters.map((letter)=>{
        return (
          <LetterInput
            key={letter.gridId}
            wordId={letter.wordId}
            gridId={letter.gridId}
            value={letter.char}
            />
        );
      });
      console.log(letterComponents)

      letterComponents.push(<LetterInput
        wordId={this.props.wordId} key='last' value='' />);
      this.setState({letterComponents});
    }

    render() {
      return (
        <div className="word">
          <div className="label">{this.props.wordId}.</div>
          {this.state.letterComponents}
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
