import React, { Component, PropTypes } from 'react';
import NavBar from './navBar'
class App extends Component {
  render() {
    return (
      <div id="app">
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
}

export default App;
