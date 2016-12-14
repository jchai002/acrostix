import * as types from '../actions/actionTypes.js';
import initialState from './initialState';


export default function gridReducer(state = initialState.grid ,action) {
  switch (action.type) {
    case types.ADD_LETTER:
      return [...state,
        Object.assign({}, action.letter)
      ]
    default:
      return state
  }
}
