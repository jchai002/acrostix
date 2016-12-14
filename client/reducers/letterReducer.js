import * as types from '../actions/actionTypes.js'

export default function letterReducer(state =[],action) {
  switch (action.type) {
    case types.ADD_LETTER:
      return [...state,
        Object.assign({}, action.letter)
      ]
    default:
      return state
  }
}
