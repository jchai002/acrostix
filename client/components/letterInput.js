import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as letterActions from '../actions/letterActions'

class LetterInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:this.props.value
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    var value = e.target.value;
    console.log(this.props)
    this.setState({value});
    this.props.actions.updateLetterWordId({char:value,gridId:null,wordId:this.props.wordId,used:false});
  }

  render() {
    const value = this.state.value;
    return (
      <div>
        <input
          onChange={this.handleChange}
          className="letter"
          maxLength='1'
          value={value}
          disabled={value}
          />
        <small>{this.props.gridId}</small>
      </div>
    );
  }
}
LetterInput.propTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
    letters: state.letters
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(letterActions,dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LetterInput);
