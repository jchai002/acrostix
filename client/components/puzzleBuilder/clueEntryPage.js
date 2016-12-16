import React, { Component, PropTypes } from 'react';
import NavBar from '../navBar';

class ClueEntryPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var pageComplete = false;
    return (
      <div className="container">
        <NavBar pageComplete={pageComplete} goToNextStep={this.props.goToNextStep} />
        <div className="row">
          <div className="col-xs-12">
            <h2>Enter Clues For Each Word</h2>
          </div>
        </div>
      </div>
    );
  }
}

ClueEntryPage.propTypes = {
};

export default ClueEntryPage;
