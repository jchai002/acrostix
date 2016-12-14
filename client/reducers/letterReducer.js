import * as types from '../actions/actionTypes.js'
import initialState from './initialState';

export default function letterReducer(state = initialState.letters,action) {
  switch (action.type) {
    case types.ADD_LETTER_SUCCESS:
      return [...state,
        Object.assign({}, action.letter)
      ]
    case types.UPDATE_LETTER_WORDID_SUCCESS:
      console.log('update letter word id')
        // need to find the first letter in state that matches word id of the payload and return new state
        // iterate through current state, use JSON.stringify to find the first letter object that matches the char
        // replace the value of WordID in that letter
        // make copy of state with the letter updated
        // return updated state
       return state
   case types.UPDATE_LETTER_WORDID_SUCCESS:
     console.log(state)
       // need to find the first letter in state that matches grid id of the payload and return new state
      return state
    default:
      return state
  }
}
