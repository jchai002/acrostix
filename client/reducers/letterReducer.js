import * as types from '../actions/actionTypes.js'

export default function letterReducer(state =[],action) {
  switch (action.type) {
    case types.ADD_LETTER_SUCCESS:
      console.log('got add',action)
      return [...state,
        Object.assign({}, action.letter)
      ]
    case types.UPDATE_LETTER_SUCCESS:
      console.log(state)
      return state
    default:
      return state
  }
}
