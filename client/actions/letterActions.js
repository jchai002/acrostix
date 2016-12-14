import * as types from './actionTypes.js'

// thunk
export function addLetter(letter) {
  return function(dispatch) {
    // simply dispatch success event for now. Will check for db call success in futures
    // if api call succeeds, call addLetterSuccess with .then, else use .catch for errors
    dispatch(addLetterSuccess(letter));
  }
}

export function addLetterSuccess(letter) {
  return {type: types.ADD_LETTER_SUCCESS, letter}
}

export function updateLetterWordId(letter) {
  return function(dispatch) {
    dispatch(updateLetterWordIdSuccess(letter));
  }
}

export function updateLetterWordIdSuccess(letter) {
  return {type: types.UPDATE_LETTER_WORDID_SUCCESS, letter}
}

export function updateLetterGridId(letter) {
  return function(dispatch) {
    dispatch(updateLetterGridIdSuccess(letter));
  }
}

export function updateLetterGridIdSuccess(letter) {
  return {type: types.UPDATE_LETTER_GRIDID_SUCCESS, letter}
}
