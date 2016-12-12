import React, { Component, PropTypes } from 'react';
import Letter from './letter';

export default class Word extends Component {
  constructor(props) {
    super(props);
    this.handleLetterChange = this.handleLetterChange.bind(this);
    this.handleLetterInput = this.handleLetterInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleLetterDelete = this.handleLetterDelete.bind(this);
    this.updateLetters = this.updateLetters.bind(this);
    this.state = {
      letters:this.props.firstLetter.toUpperCase(),
      letterComponents:null
    }
  }

  handleLetterChange(e) {
    var char = e.target.value;
    if (char && this.props.letterTracker[char] > 0) {
      this.handleLetterInput(char);
    } else {
      this.props.outOfLetter(char);
    }
  }

  handleLetterInput(char) {
    var letters;
    const Word = this;
    const newLetterState = Word.state.letters + char;
    Word.setState({letters:newLetterState},function(){
      Word.props.handleWordChange(char,Word.props.wordId,'input');
      this.updateLetters();
    });
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

  componentDidMount() {
    this.updateLetters();
  }

  updateLetters() {
    console.log('new letter in word',this.props.wordId, 'it is', this.props.newChar);
    const Word = this;
    var letters = Word.state.letters.split('').map(function(char,i){
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
    this.setState({letterComponents:letters});
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
