import React, { Component, PropTypes } from 'react';
import NavBar from './navBar'
class App extends Component {
  insertPuzzle() {
    Meteor.call('puzzles.insert')
  }

  render() {
    return (
      <div id="app">
        <NavBar insertPuzzle={this.insertPuzzle}/>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
}

export default App;
