import * as types from '../actions/actionTypes.js'
import initialState from './initialState';
import update from 'immutability-helper';

export default function wordReducer(state = initialState.words,action) {
  switch (action.type) {
    case types.ADD_LETTER_TO_WORD_SUCCESS:
      var wordId = action.letter.wordId;
      var stateClone = JSON.parse(JSON.stringify(state));
      stateClone[wordId].push(action.letter);
      return stateClone
    case types.REMOVE_LETTER_FROM_WORD_SUCCESS:
      var wordId = action.letter.wordId;
      var stateClone = JSON.parse(JSON.stringify(state));
      stateClone[wordId].pop();
      return stateClone
    default:
      return state
  }
}
