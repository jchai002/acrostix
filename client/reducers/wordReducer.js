import * as types from '../actions/actionTypes.js'
import initialState from './initialState';

export default function wordReducer(state = initialState.words,action) {
  switch (action.type) {
    case types.ADD_LETTER_TO_WORD_SUCCESS:
      console.log('add to word',action.letter)
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
