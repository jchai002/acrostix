import * as types from '../actions/actionTypes.js'
import initialState from './initialState';
import update from 'immutability-helper';

export default function wordReducer(state = initialState.words,action) {
  switch (action.type) {
    case types.ADD_LETTER_TO_WORD_SUCCESS:
      var wordId = action.letter.wordId;
      var stateClone = JSON.parse(JSON.stringify(state));
      var len = stateClone[wordId].length
      stateClone[wordId][len] = action.letter
      // console.log('after push ',word)

      console.log('after assign',stateClone[wordId])

      // return [...state,
      //   Object.assign({}, action.letter)
      // ]
      return state
    case types.REMOVE_LETTER_FROM_WORD_SUCCESS:
      console.log('remove from word',action.letter)
      // return [...state,
      //   Object.assign({}, action.letter)
      // ]
      return state
    default:
      return state
  }
}
