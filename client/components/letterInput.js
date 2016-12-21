import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as letterActions from '../actions/letterActions'

class LetterInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.letterIsAvailable = this.letterIsAvailable.bind(this);
  }

  letterIsAvailable(char) {
    var available = false;
    this.props.letters.forEach((letter)=>{
      if (!letter.wordId && letter.char === char) {
        available = true;
      }
    })
    return available
  }

  handleChange(e) {
    var value = e.target.value;
    if (this.letterIsAvailable(value)){
      this.props.actions.useLetter({char:value,gridId:null,wordId:this.props.wordId});
    } else {
      // if there are no more letters left for this input, don't update and dispatch fail event
      this.props.actions.useLetterFail();
      this.outOfLetterAnimation(value);
    }
  }

  outOfLetterAnimation(char) {
    var $tracker = $('.letter-'+char.toUpperCase()).parent();
    $tracker.addClass('animated rubberBand');
    setTimeout(function(){
      $tracker.removeClass('animated rubberBand');
    },2000);
  }

  // set which input is auto-focused on
  componentDidMount() {
    if (this.props.shouldFocus) {
      this.refs._input.focus();
    }
  }

  componentDidUpdate() {
    if (this.props.shouldFocus) {
      this.refs._input.focus();
    }
  }

  render() {
    const value = this.props.value;
    return (
      <div className="letter">
        <input
          ref='_input'
          onChange={this.handleChange}
          onKeyDown={this.props.handleKeyDown}
          maxLength='1'
          value={value}
          disabled={value}
          />
        <small>{this.props.gridId}</small>
      </div>
    );
  }
}
LetterInput.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(LetterInput);
