import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as letterActions from '../../actions/letterActions';
import * as wordActions from '../../actions/wordActions';

import TextArea from '../textArea'

function isLetter(char) {
  return char.match(/^[A-Za-z]+$/);
}

class QuoteEntryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote:'',
      authorName:'',
      numberOfWords:0
    }
    this.handleQuoteChange = this.handleQuoteChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.validatePuzzle = this.validatePuzzle.bind(this);
    this.goToNextStep = this.goToNextStep.bind(this)
  }

  handleQuoteChange(string) {
    this.setState({quote: string});
  }
  handleAuthorChange(string) {
    this.setState({authorName: string.replace(/[^A-Za-z]/g,'')});
  }

  validatePuzzle() {
    var dictionary = {};
    var enoughLetters = true;
    this.state.quote.split('').forEach((char)=>{
      if (isLetter(char)) {
        if (dictionary[char.toLowerCase()]) {
          dictionary[char.toLowerCase()] += 1;
        } else {
          dictionary[char.toLowerCase()] = 1;
        }
      }
    });
    this.state.authorName.split('').forEach((char)=>{
      var char = char.toLowerCase();
      if (dictionary[char] && dictionary[char] !== 0) {
        dictionary[char] --;
      } else {
        enoughLetters = false;
      }
    });
    return enoughLetters
  }

  goToNextStep() {
    var Page = this;
    var counter = 1;
    Page.state.quote.split('').forEach(function(char){
      var char = char.toLowerCase();
      if (isLetter(char)) {
        Page.props.letterActions.createLetter({char:char,gridId:counter,wordId:''});
        counter ++;
      } else if (char===' ') {
        Page.props.letterActions.createLetter({char:char,gridId:'',wordId:null});
      }
    });

    // add future logic to opt out of author name match constraints here
    var numberOfWords = this.state.authorName.length
    Page.props.wordActions.createWords(numberOfWords);

    this.props.handleStepChange('next');
  }

  render() {
    var continueButtonClass, quoteConstraintClass, authorConstraintClass, validityConstraintClass;

    if (this.state.quote.length) {
      var quoteConstraintClass = "green";
    } else {
      var quoteConstraintClass = "red";
    }

    if (this.state.authorName.length) {
      authorConstraintClass = "green";
    } else {
      authorConstraintClass = "red";
    }

    if (this.state.quote.length && this.state.authorName.length && this.validatePuzzle()) {
      continueButtonClass = "btn btn-primary white";
      validityConstraintClass = "green";
    } else {
      continueButtonClass = "btn btn-primary white disabled";
      validityConstraintClass = "red";
    }
    return (
      <div className="row">
        <div className="col-xs-12 col-lg-8 step step-1">
          <h2>Enter a quote and its author</h2>
          <form>
            <div className="form-group">
              <label>Please Enter Quote</label>
              <TextArea
                className="quote-input"
                rows="5"
                handleChange={this.handleQuoteChange} />
            </div>
            <div className="form-group">
              <label>Please Enter Author</label>
              <TextArea
                className="author-input"
                rows="1"
                maxLength="26"
                handleChange={this.handleAuthorChange}
                />
            </div>
            <a onClick={this.goToNextStep} className={continueButtonClass} >Continue</a>
          </form>
        </div>
        <div className="col-xs-12 col-lg-4 step step-1">
          <h2>Constraints</h2>
          <ul className="constraints">
            <li className={quoteConstraintClass}>Quote is not empty</li>
            <li className={authorConstraintClass}>Author is not empty</li>
            <li className={validityConstraintClass}>Author name can be made up by letters from the quote</li>
          </ul>
        </div>
      </div>
    );
  }
}

QuoteEntryPage.propTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
    letters: state.letters
  };
}

function mapDispatchToProps(dispatch) {
  return {
    letterActions: bindActionCreators(letterActions,dispatch),
    wordActions: bindActionCreators(wordActions,dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuoteEntryPage);
