import React, { Component, PropTypes } from 'react';
import QuoteEntryPage from './quoteEntryPage';
import WordEntryPage from './wordEntryPage';
import ClueEntryPage from './clueEntryPage';


class PuzzleBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep:1
    }
    this.handleStepChange = this.handleStepChange.bind(this);
  }

  handleStepChange(action) {
    if (action === 'next') {
      var currentStep = this.state.currentStep + 1;
      this.setState({currentStep})
    }
    if (action === 'prev') {
      var currentStep = this.state.currentStep - 1;
      this.setState({currentStep})
    }
  }

  assignView() {
    switch(this.state.currentStep) {
      case 1:
        return (<QuoteEntryPage handleStepChange={this.handleStepChange} />);
      case 2:
        return (<WordEntryPage handleStepChange={this.handleStepChange} />);
      case 3:
        return (<ClueEntryPage handleStepChange={this.handleStepChange} />);
    }
  }

  render() {
    var view = this.assignView();
    return (
      <div className="container">
        <h1>Puzzle Builder</h1>
        {view}
      </div>
    );
  }
}

PuzzleBuilder.propTypes = {
}

export default PuzzleBuilder;
