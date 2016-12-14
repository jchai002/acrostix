import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as letterActions from '../actions/letterActions'
import Tile from './tile';


class Grid extends Component {
  constructor(props) {
    super(props)
    this.updateGrid = this.updateGrid.bind(this)
  }

  componentDidUpdate() {
    console.log(this.props)
  }

  updateGrid() {
    var letters = this.props.letters;
    // fill up the blank spaces with black tiles
    while (letters.length%10 != 0) {
      letters.push(
        {char:'',letterNumber:'',wordId:null,used:false}
      );
    }
    var grid = letters.map(function(obj,i){
      return (
        <Tile
          key={i}
          char={obj.char}
          letterNumber={obj.letterNumber}
          wordId={obj.wordId}
          />
      );
    });
    return grid
  }

  render() {
    var grid = this.updateGrid()
    return (
      <div className="grid">
        {grid}
      </div>
    );
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
    actions: bindActionCreators(letterActions,dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Grid);
