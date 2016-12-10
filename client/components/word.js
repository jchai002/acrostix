import React, { Component, PropTypes } from 'react';
export default class Word extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:''
    }
  }

  render() {
    const value = this.state.value;
    return (
      <div className="word">
        <label className="first-letter">
          {this.props.firstLetter}
        </label>
        <input className="form-control" value={value} />
      </div>
    );
  }
}
Word.propTypes = {
};
