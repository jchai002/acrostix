import React, { Component } from 'react';
import TextArea from '../textArea';
import { browserHistory } from 'react-router';

class newPuzzlePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      puzzleName:'',
      published: true
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePublishChange = this.handlePublishChange.bind(this);
    this.createPuzzle = this.createPuzzle.bind(this);

  }

  createPuzzle() {
    Meteor.call('puzzles.insert',this.state.puzzleName,this.state.published,(error, puzzleId) => {
      console.log(puzzleId)
      browserHistory.push(`/puzzles/${puzzleId}`);
    });
  }

  handleNameChange(puzzleName) {
    this.setState({puzzleName})
  }

  handlePublishChange(e) {
    this.setState({published: !this.state.published});
  }

  render() {
    var name = this.state.puzzleName;
    return (
      <div id="newPuzzlePage">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-lg-6 col-lg-offset-3">
              <h1>Create New Puzzle</h1>
              <form>
                <div className="form-group">
                  <label>Puzzle Name</label>
                  <TextArea handleChange={this.handleNameChange} rows="1" />
                </div>
                <div className="form-group">
                  <label>Public?</label>
                  <input type="checkbox" onChange={this.handlePublishChange} checked={this.state.published} />
                </div>
                <div className="form-group">
                  <a className="btn btn-primary white" onClick={this.createPuzzle} to="/">Create</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default newPuzzlePage;
