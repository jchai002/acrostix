import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as wordActions from '../actions/wordActions'
import Tile from './tile';
import _ from 'lodash';


class Grid extends Component {
  constructor(props) {
    super(props);
    this.updateGrid = this.updateGrid.bind(this);
  }

  updateGrid() {
    var grid = this.props.grid;
    // fill up the blank spaces with black tiles
    while (grid.length%24 != 0) {
      grid = [...grid,
        Object.assign({}, {char:'',gridId:'',wordId:null})
      ]
    }
    return grid.map(function(obj,i){
      return (
        <Tile
          key={i}
          char={obj.char}
          gridId={obj.gridId}
          wordId={obj.wordId}
          />
      );
    });
  }

  componentWillReceiveProps(nextProps) {
    // turn into strings to allow lodash comparason
    var currentLetterStrings = this.props.grid.map((letter)=>{
      return JSON.stringify(letter)
    })
    // get new letter entered
    var modifiedLetter;
    nextProps.grid.forEach((letter)=>{
      if (!_.includes(currentLetterStrings,JSON.stringify(letter))) {
        return modifiedLetter = letter;
      }
    });

    // check to see if there is a letter modified
    if (modifiedLetter) {
      if (modifiedLetter.wordId) {
        this.props.actions.addLetterToWord(modifiedLetter)
      } else {
        var wordId;
        this.props.grid.forEach((letter)=>{
          if (letter.gridId === modifiedLetter.gridId) {
            wordId = letter.wordId
          }
        })
        this.props.actions.removeLetterFromWord({char:modifiedLetter.char,wordId:wordId,gridId:modifiedLetter.gridId})
      }
    }
  }

  render() {
    var grid = this.updateGrid();
    console.log(this.props)
    return (
      <div className="grid" style={this.props.display}>
        {grid}
      </div>
    );
  }

}
Grid.propTypes = {
  grid: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    grid: state.grid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(wordActions,dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Grid);
