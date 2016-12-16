import React, { Component, PropTypes } from 'react';

class App extends Component {
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
}

export default App;
