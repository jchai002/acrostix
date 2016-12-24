import * as types from '../actions/actionTypes.js'
import initialState from './initialState';

export default function letterReducer(state = initialState.grid,action) {
  switch (action.type) {
    case types.ADD_LETTER_TO_GRID_SUCCESS:
      return [...state,
        Object.assign({}, action.letter)
      ]
    case types.USE_GRID_LETTER_SUCCESS:
      // iterate through current state, use JSON.stringify to find the first letter object that matches the char
      // replace the value of WordID in that letter
      // return copy of state with the letter updated
      var stateClone = JSON.parse(JSON.stringify(state));
      for (var i in stateClone) {
        let letter = stateClone[i];
        if (!letter.wordId && letter.char===action.letter.char) {
          letter.wordId = action.letter.wordId
          stateClone[i] = letter;
          break
        }
      }
      return stateClone
    case types.RESTORE_GRID_LETTER_SUCCESS:
      var stateClone = JSON.parse(JSON.stringify(state));
      for (var i in stateClone) {
        if (stateClone[i].gridId === action.letter.gridId) {
          let char = stateClone[i].char
          stateClone[i] =  {char:char, gridId:action.letter.gridId, wordId: null}
          break
        }
      }
      return stateClone
    case types.LOAD_GRID_FROM_DB_SUCCESSS:
      return action.grid
    default:
      return state
  }
}
