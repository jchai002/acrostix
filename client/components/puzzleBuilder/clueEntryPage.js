import React, { Component, PropTypes } from 'react';
import BuilderNav from './builderNav';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as wordActions from '../../actions/wordActions';
import Word from '../word'
import Label from '../label';
import TextArea from '../textArea';
import _ from 'lodash'


class ClueEntryPage extends Component {
  constructor(props) {
    super(props);
    this.handleClueChange = this.handleClueChange.bind(this);
  }

  handleClueChange(text,wordId){
    this.props.actions.updateClue({wordId:wordId,text:text});
  }

  componentWillMount() {
    if (_.isEmpty(this.props.words)) {
      this.props.actions.loadWordsFromDB(this.props.puzzle._id);
    }
  }

  componentDidUpdate() {
    Meteor.call('puzzles.updateWords',this.props.puzzle,this.props.words);
  }

  render() {
    var wordIds = [];
    const Words = this.props.words;
    for (var wordId in Words) {
      wordIds.push(wordId)
    }

    var wordComponents = wordIds.map((id,i)=>{
      return (
        <Word
          noLetterEntryAllowed={true}
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
            value={Words[id].clue}
            handleChange={this.handleClueChange}
            />
        </div>
      );
    });
    var pageComplete = false;
    return (
      <div className="container">
        <BuilderNav
           pageComplete={pageComplete}
           goToNextStep={this.goToNextStep}
           goToPrevStep={this.props.goToPrevStep}
          />
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
