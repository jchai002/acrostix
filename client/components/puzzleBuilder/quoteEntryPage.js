import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gridActions from '../../actions/gridActions';
import * as wordActions from '../../actions/wordActions';
import Alphabet from "../../constants/alphabet";
import BuilderNav from './builderNav';
import TextArea from '../textArea';
import * as utils from  '../../helpers/utils';

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
    this.checkForCompletion = this.checkForCompletion.bind(this)
    this.prepGrid = this.prepGrid.bind(this);
  }

  handleQuoteChange(string) {
    this.setState({quote: string});
  }
  handleAuthorChange(string) {
    this.setState({authorName: string.replace(/[^A-Za-z]/g,'').toLowerCase()});
  }

  validatePuzzle() {
    var dictionary = {};
    var enoughLetters = true;
    this.state.quote.split('').forEach((char)=>{
      if (utils.isLetter(char)) {
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

  prepGrid() {
    const Page = this;
    // add future logic to opt out of author name match constraints here
    var authorNameLetters = Page.state.authorName.split('');
    var numberOfWords = authorNameLetters.length
    Page.props.wordActions.createWords(numberOfWords);

    var counter = 1;
    Page.state.quote.replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, ' ').split('').forEach(function(char){
      var char = char.toLowerCase();
      if (utils.isLetter(char)) {
        Page.props.gridActions.addLetterToGrid({char:char,gridId:counter,wordId:''});
        counter ++;
      } else if (char===' ') {
        Page.props.gridActions.addLetterToGrid({char:char,gridId:'',wordId:null});
      }
    });

    // use the letters already used by author name
    for (var i = 0;i < numberOfWords; i++) {
      Page.props.gridActions.useGridLetter({char:authorNameLetters[i],gridId:'',wordId:Alphabet[i]});
    }
  }

  componentDidUpdate() {
    if (this.props.grid.length) {
      this.props.goToNextStep()
    }
  }

  checkForCompletion() {
    if (this.state.quote.length && this.state.authorName.length && this.validatePuzzle()) {
      return true
    }
  }

  render() {
    var quoteConstraintClass, authorConstraintClass, validityConstraintClass;

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

    if (this.state.authorName.length && this.validatePuzzle()) {
      validityConstraintClass = "green";
    } else {
      validityConstraintClass = "red";
    }

    var pageComplete = this.checkForCompletion();
    return (
      <div className="container">
        <BuilderNav
          nextButtonContent="Next: Enter Words"
          goToNextStep={this.prepGrid}
          pageComplete={pageComplete}
          />
        <div className="row">
          <div className="col-xs-12 col-lg-6">
            <h2>Enter a quote and its author</h2>
            <form>
              <div className="form-group">
                <label>Please Enter Quote</label>
                <TextArea
                  rows="5"
                  handleChange={this.handleQuoteChange} />
              </div>
              <div className="form-group">
                <label>Please Enter Author</label>
                <TextArea
                  rows="1"
                  maxLength="26"
                  handleChange={this.handleAuthorChange}
                  />
              </div>
            </form>
          </div>
          <div className="col-xs-12 col-lg-6">
            <h2>Constraints</h2>
            <ul className="constraints">
              <li className={quoteConstraintClass}>Quote is not empty</li>
              <li className={authorConstraintClass}>Author is not empty</li>
              <li className={validityConstraintClass}>Author name can be made up by letters from the quote</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

QuoteEntryPage.propTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
    grid: state.grid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    gridActions: bindActionCreators(gridActions,dispatch),
    wordActions: bindActionCreators(wordActions,dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuoteEntryPage);
