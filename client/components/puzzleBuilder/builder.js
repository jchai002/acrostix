import React, { Component, PropTypes } from 'react';
import QuoteEntryPage from './quoteEntryPage';
import WordEntryPage from './wordEntryPage';
import ClueEntryPage from './clueEntryPage';
import { createContainer } from 'meteor/react-meteor-data';
import { Puzzles } from '../../../collections/puzzles';

class PuzzleBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep:1
    }
    this.goToNextStep = this.goToNextStep.bind(this);
  }

  goToNextStep() {
    var currentStep = this.state.currentStep + 1;
    this.setState({currentStep})
  }

  goToPrevStep() {
    var currentStep = this.state.currentStep - 1;
    this.setState({currentStep})
  }

  assignView() {
    switch(this.state.currentStep) {
      case 1:
      return (<QuoteEntryPage goToNextStep={this.goToNextStep} />);
      case 2:
      return (<WordEntryPage goToNextStep={this.goToNextStep} />);
      case 3:
      return (<ClueEntryPage goToNextStep={this.goToNextStep} />);
      defualt:
      return (<QuoteEntryPage goToNextStep={this.goToNextStep} />);
    }
  }

  render() {
    console.log(this.props.puzzles)
    var view = this.assignView();
    return (
      <section id="builder">
        {view}
      </section>
    );
  }
}

PuzzleBuilder.propTypes = {
}

export default createContainer(() => {
  Meteor.subscribe('puzzles');
  return { puzzles: Puzzles.find({}).fetch() };
}, PuzzleBuilder);
