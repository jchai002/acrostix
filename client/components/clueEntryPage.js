import React, { Component, PropTypes } from 'react';

class ClueEntryPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>Enter Clues For Each Word</h2>
        </div>
      </div>
    );
  }
}

ClueEntryPage.propTypes = {
};

export default ClueEntryPage;
