import * as types from '../actions/actionTypes.js'
import initialState from './initialState';

export default function letterReducer(state = initialState.letters,action) {
  switch (action.type) {
    case types.CREATE_LETTER_SUCCESS:
      return [...state,
        Object.assign({}, action.letter)
      ]
    case types.UPDATE_LETTER_WORDID_SUCCESS:
      // need to find the first letter in state that matches word id of the payload and return new state
      // iterate through current state, use JSON.stringify to find the first letter object that matches the char
      // replace the value of WordID in that letter
      // make copy of state with the letter updated
      // return updated state
      var stateClone = JSON.parse(JSON.stringify(state))
      for (var i in stateClone) {
        let letter = stateClone[i];
        if (!letter.wordId && letter.char===action.letter.char) {
          letter.wordId = action.letter.wordId
          stateClone[i] = letter;
          break
        }
      }
      return stateClone
    default:
      return state
  }
}
