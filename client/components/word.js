import React, { Component, PropTypes } from 'react';
import Letter from './letter';
import _ from 'underscore';

export default class Word extends Component {
  constructor(props) {
    super(props);
    this.handleLetterChange = this.handleLetterChange.bind(this);
    this.handleLetterInput = this.handleLetterInput.bind(this);
    this.state = {
      letters:'',
      letterComponents:null
    }
  }

  handleLetterChange(e) {
    if (e.target.value) {
      this.handleLetterInput(e.target.value);
    } else {
      handleLetterDelete()
    }
  }

  handleLetterInput(char) {
    var letters;
    const Word = this;
    const newLetterState = Word.state.letters + char;
    Word.setState({letters:newLetterState},function(){
      letters = Word.state.letters.split('').map(function(char,i){
        return(
          <Letter key={i} value={char} handleLetterChange={Word.handleLetterChange} />
        );
      });
      letters.push(<Letter key='last' value='' handleLetterChange={Word.handleLetterChange} />);
      console.log(letters)
      this.setState({letterComponents:letters});
    });
  }

  handleLetterDelete(e) {

  }

  render() {
    const value = this.state.value;
    var letters;
    if (this.state.letterComponents) {
      letters = this.state.letterComponents;
    } else {
      letters = <Letter value='' handleLetterChange={this.handleLetterChange} />
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
