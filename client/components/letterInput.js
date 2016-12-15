import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as letterActions from '../actions/letterActions'

class LetterInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:this.props.value
    }
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
      this.setState({value});
    } else {
      // if there are no more letters left for this input, don't update and dispatch fail event
      this.props.actions.useLetterFail();
      console.log('no more', value);
    }
  }

  componentDidMount() {
    this._input.focus();
  }

  componentWillUpdate(nextProps,nextState) {
    console.log(this.state,nextState)
  }

  render() {
    const value = this.state.value;
    return (
      <div className="letter">
        <input
          ref={(c) => this._input = c}
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
