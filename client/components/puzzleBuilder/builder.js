import React, { Component, PropTypes } from 'react';
import QuoteEntryPage from './quoteEntryPage';
import WordEntryPage from './wordEntryPage';
import ClueEntryPage from './clueEntryPage';
import ReviewPage from './reviewPage';
import { createContainer } from 'meteor/react-meteor-data';
import { Puzzles } from '../../../collections/puzzles';
import * as generalActions from '../../actions/generalActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class PuzzleBuilder extends Component {
  constructor(props) {
    super(props);
    this.goToNextStep = this.goToNextStep.bind(this);
    this.goToPrevStep = this.goToPrevStep.bind(this);
  }

  goToNextStep() {
    var currentStep = this.props.puzzle.currentStep + 1;
    Meteor.call('puzzles.updateCurrentStep',this.props.puzzle, currentStep);
  }

  goToPrevStep() {
    var currentStep = this.props.puzzle.currentStep - 1;
    Meteor.call('puzzles.updateCurrentStep',this.props.puzzle, currentStep);
  }

  assignView() {
    switch(this.props.puzzle.currentStep) {
      case 1:
      return (<QuoteEntryPage  goToNextStep={this.goToNextStep} goToPrevStep={this.goToPrevStep} puzzle={this.props.puzzle} />
    );
    case 2:
    return (<WordEntryPage goToNextStep={this.goToNextStep} goToPrevStep={this.goToPrevStep}
    puzzle={this.props.puzzle} />);
    case 3:
    return (<ClueEntryPage goToNextStep={this.goToNextStep} goToPrevStep={this.goToPrevStep} puzzle={this.props.puzzle} />);
    case 4:
    return (<ReviewPage goToNextStep={this.goToNextStep} goToPrevStep={this.goToPrevStep} puzzle={this.props.puzzle} />);
    defualt:
    return (<QuoteEntryPage goToNextStep={this.goToNextStep} puzzle={this.props.puzzle} />);
  }
}


  componentWillMount() {
    this.props.actions.clearStore()
  }

  render() {
    var view;
    if (this.props.puzzle) {
      view = this.assignView();
    } else {
      view = (
        <div id="loading">
          <div className="animated pulse infinite">
            <i className="fa fa-3x fa-puzzle-piece"></i>
            <div>loading...</div>
          </div>
        </div>
      );
    }
    return (
      <section id="builder">
        {view}
      </section>
    );
  }
}

PuzzleBuilder.propTypes = {
}

function mapStateToProps(state, ownProps) {
  return {
    grid: state.grid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(generalActions,dispatch)
  }
}

export default createContainer((props) => {
  Meteor.subscribe('ownPuzzles');
  Meteor.subscribe('publicPuzzles');
  const { puzzleId } = props.params;
  return { puzzle: Puzzles.findOne(puzzleId) };
}, connect(mapStateToProps,mapDispatchToProps)(PuzzleBuilder));
