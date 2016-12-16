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
  }

  assignView() {
    switch(this.state.currentStep) {
      case 1:
        return (<QuoteEntryPage />);
      case 2:
        return (<WordEntryPage />);
      case 3:
        return (<ClueEntryPage />);
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
