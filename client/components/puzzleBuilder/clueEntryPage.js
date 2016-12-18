import React, { Component, PropTypes } from 'react';
import NavBar from '../navBar';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as wordActions from '../../actions/wordActions';
import Word from '../word'
import Label from '../label';
import TextArea from '../textArea';


class ClueEntryPage extends Component {
  constructor(props) {
    super(props);
    this.handleClueChange = this.handleClueChange.bind(this);
  }

  handleClueChange(text,wordId){
    this.props.actions.updateClue({wordId:wordId,text:text});
  }

  render() {
    var wordIds = [];
    for (var wordId in this.props.words) {
      wordIds.push(wordId)
    }
    var noLetterEntryAllowed = true;

    var wordComponents = wordIds.map((id,i)=>{
      return (
        <Word
          noLetterEntryAllowed={noLetterEntryAllowed}
          key={i}
          wordId={id}
          />
      );
    });
    var clueComponents = wordIds.map((id,i)=>{
      return (
        <div key = {'clue-'+i} className="clues">
          <Label value={id} />
          <TextArea
            className="author-input"
            rows="1"
            wordId={id}
            handleChange={this.handleClueChange}
            />
        </div>
      );
    });
    var pageComplete = false;
    return (
      <div className="container">
        <NavBar pageComplete={pageComplete} goToNextStep={this.props.goToNextStep} />
        <div className="row">
          <div className="col-xs-12">
            <h2>Enter Clues For Each Word</h2>
          </div>
          <div className="col-xs-12 col-lg-6">
            <div className="words">
              {wordComponents}
            </div>
          </div>
          <div className="col-xs-12 col-lg-6">
            {clueComponents}
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

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(wordActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ClueEntryPage);
