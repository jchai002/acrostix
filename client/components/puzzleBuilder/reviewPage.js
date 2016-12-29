import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gridActions from '../../actions/gridActions';
import * as wordActions from '../../actions/wordActions';
import BuilderNav from './builderNav';
import Word from '../word'
import Label from '../label';
import Grid from '../grid'
import _ from 'lodash'


class ReviewPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (_.isEmpty(this.props.grid) && _.isEmpty(this.props.words)) {
      this.props.gridActions.loadGridFromDB(this.props.puzzle._id);
      this.props.wordActions.loadWordsFromDB(this.props.puzzle._id);
    }
  }

  render() {
    var wordIds = [];
    const Words = this.props.words;
    for (var wordId in Words) {
      wordIds.push(wordId)
    }

    var wordComponents = wordIds.map((id,i)=>{
      return (
        <div className="review-row">
        <Word
          noLetterEntryAllowed={true}
          key={i}
          wordId={id}
          />
        <div className="clue-row">
          <Label key={'label-'+i} value={id} />
          <span className="clue">{this.props.words[id].clue}</span>
        </div>
        </div>
      );
    });
    return (
      <div className="container">
        <BuilderNav
           pageComplete={true}
           buttonContent="Print"
           goToNextStep={this.goToNextStep}
           goToPrevStep={this.props.goToPrevStep}
          />
        <div className="row">
          <div className="col-xs-12">
            <h2>Review & Print</h2>
          </div>
          <div className="col-xs-12">
            <Grid puzzle={this.props.puzzle} />
          </div>
          <div className="col-xs-12 col-lg-6">
            <div className="words">
              {wordComponents}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReviewPage.propTypes = {
};

function mapDispatchToProps(dispatch) {
  return {
    gridActions: bindActionCreators(gridActions,dispatch),
    wordActions: bindActionCreators(wordActions,dispatch)
  }
}

function mapStateToProps(state, ownProps) {
  return {
    words: state.words
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ReviewPage);
