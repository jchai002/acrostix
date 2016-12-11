import React, { Component, PropTypes } from 'react';
import Letter from './letter';
import _ from 'underscore';

export default class Word extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value:''
    }
  }

  handleChange(e) {
    const oldArr = this.state.value.split('');
    const newArr = e.target.value.split('');
    var diff;
    if (newArr.length > oldArr.length) {
      // added chars
      diff = _.difference(newArr,oldArr)
      console.log('old value',this.state.value);
      console.log('new value',e.target.value);
      console.log(diff)
    } else {
      // removed chars
      diff = _.difference(oldArr,newArr)
      console.log('old value',this.state.value);
      console.log('new value',e.target.value);
      console.log(diff)
    }
    this.setState({value: e.target.value});
    this.props.handleWordInput(e.target.value,this.props.wordId);
  }

  render() {
    const value = this.state.value;
    return (
      <div className="word">
        <div className="label">{this.props.wordId}.</div>
        <div className="first-letter">
          {this.props.firstLetter}
        </div>
        <Letter />
      </div>
    );
  }
}
Word.propTypes = {
};
