import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gridActions from '../actions/gridActions'

import Tile from './tile';


class Grid extends Component {
  constructor(props) {
  }
}
Grid.propTypes = {
  letters: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    letters: state.letters
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(gridActions,dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Grid);
