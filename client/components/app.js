import React, { Component, PropTypes } from 'react';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Puzzle Builder</h1>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
}

export default App;
