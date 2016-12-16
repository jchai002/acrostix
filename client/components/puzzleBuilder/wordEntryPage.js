import React, { Component, PropTypes } from 'react';
import Grid from '../grid'

class WordEntryPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-lg-8">
          <Grid />
        </div>
        <div className="col-xs-12 col-lg-4">
          <h2>Letters Remaining</h2>
        </div>
      </div>
    );
  }
}

WordEntryPage.propTypes = {
};
export default WordEntryPage;
