import React, { Component, PropTypes } from 'react';
import NavBar from '../navBar';
import {connect} from 'react-redux';
import * as wordActions from '../../actions/wordActions';
import Word from '../word'


class ClueEntryPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var wordIds = [];
    for (var wordId in this.props.words) {
      wordIds.push(wordId)
    }
    var noLetterEntryAllowed = true;

    var wordComponents = wordIds.map((id)=>{
      return (
        <Word
          noLetterEntryAllowed={noLetterEntryAllowed}
          key={id}
          wordId={id}
          />
      );
    });
    var pageComplete = false;
    return (
      <div className="container">
        <NavBar pageComplete={pageComplete} goToNextStep={this.props.goToNextStep} />
        <div className="row">
          <div className="col-xs-12">
            <h2>Enter Clues For Each Word</h2>
              <div className="words">
                {wordComponents}
              </div>
          </div>
        </div>
      </div>
    );
  }
}

ClueEntryPage.propTypes = {
};


function mapStateToProps(state, ownProps) {
  return {
    words: state.words
  };
}

export default connect(mapStateToProps)(ClueEntryPage);
