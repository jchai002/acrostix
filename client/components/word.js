import React, { Component, PropTypes } from 'react';
import Letter from './letter';
import _ from 'underscore';

export default class Word extends Component {
  constructor(props) {
    super(props);
    this.handleLetterChange = this.handleLetterChange.bind(this);
    this.handleLetterInput = this.handleLetterInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleLetterDelete = this.handleLetterDelete.bind(this);
    this.state = {
      letters:'',
      letterComponents:null
    }
  }

  handleLetterChange(e) {
    var char = e.target.value;
    if (char) {
      this.handleLetterInput(char);
    }
  }

  handleLetterInput(char) {
    var letters;
    const Word = this;
    const newLetterState = Word.state.letters + char;
    Word.setState({letters:newLetterState},function(){
      letters = Word.state.letters.split('').map(function(char,i){
        return(
          <Letter
            key={i}
            value={char}
            handleLetterChange={Word.handleLetterChange}
            handleKeyDown={Word.handleKeyDown}
          />
        );
      });
      letters.push(<Letter key='last' value='' handleLetterChange={Word.handleLetterChange} handleKeyDown={Word.handleKeyDown}/>);
      Word.setState({letterComponents:letters});
      Word.props.handleWordChange(char,Word.props.wordId,'input');
    });
  }

  handleKeyDown(e) {
    if (e.keyCode === 8 || e.keyCode === 46) {
     this.handleLetterDelete();
    }
  }

  handleLetterDelete() {
    var letters;
    const Word = this;
    const deletedChar = Word.state.letters.split('').pop();
    const newLetterState = Word.state.letters.slice(0, -1);
    Word.setState({letters:newLetterState},function(){
      letters = Word.state.letters.split('').map(function(char,i){
        return(
          <Letter
            key={i}
            value={char}
            handleLetterChange={Word.handleLetterChange}
            handleKeyDown={Word.handleKeyDown}
          />
        );
      });
      letters.push(<Letter key='last' value='' handleLetterChange={Word.handleLetterChange} handleKeyDown={Word.handleKeyDown}/>);
      Word.setState({letterComponents:letters});
      Word.props.handleWordChange(deletedChar,Word.props.wordId,'delete');
    });
  }

  render() {
    const value = this.state.value;
    var letters;
    if (this.state.letterComponents) {
      letters = this.state.letterComponents;
    } else {
      letters = <Letter
        value='' handleLetterChange={this.handleLetterChange} handleKeyDown={this.handleKeyDown}
      />
    }
    return (
      <div className="word">
        <div className="label">{this.props.wordId}.</div>
        <div className="first-letter">
          {this.props.firstLetter}
        </div>
        {letters}
      </div>
    );
  }
}
Word.propTypes = {
};
