import React, { Component, PropTypes } from 'react';
import QuoteEntryPage from './quoteEntryPage';
import WordEntryPage from './wordEntryPage';
import ClueEntryPage from './clueEntryPage';
import { createContainer } from 'meteor/react-meteor-data';
import { Puzzles } from '../../../collections/puzzles';

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
      return (<WordEntryPage goToNextStep={this.goToNextStep} goToPrevStep={this.goToPrevStep} puzzle={this.props.puzzle} />);
      case 3:
      return (<ClueEntryPage goToNextStep={this.goToNextStep} goToPrevStep={this.goToPrevStep} puzzle={this.props.puzzle} />);
      defualt:
      return (<QuoteEntryPage goToNextStep={this.goToNextStep} puzzle={this.props.puzzle} />);
    }
  }

  render() {
    var view;
    if (this.props.puzzle) {
      view = this.assignView();
    } else {
      view = <div>Loading...</div>;
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

export default createContainer((props) => {
  Meteor.subscribe('ownPuzzles');
  Meteor.subscribe('publicPuzzles');
  const { puzzleId } = props.params;
  return { puzzle: Puzzles.findOne(puzzleId) };
}, PuzzleBuilder);
