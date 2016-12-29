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
      <div id="new-puzzle-page">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-lg-6 offset-lg-3">
              <div className="card">
                <h1>Create New Puzzle</h1>
                <form>
                  <fieldset className="form-group">
                    <label>Puzzle Name</label>
                    <TextArea handleChange={this.handleNameChange} rows="1" />
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Public?</label>
                    <input type="checkbox" onChange={this.handlePublishChange} checked={this.state.published} />
                  </fieldset>
                  <fieldset className="form-group">
                    <a className="btn btn-primary white" onClick={this.createPuzzle} to="/">Create</a>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default newPuzzlePage;
