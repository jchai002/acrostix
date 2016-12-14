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

export function updateLetter(letter) {
  return function(dispatch) {
    dispatch(updateLetterSuccess(letter));
  }
}

export function updateLetterSuccess(letter) {
  return {type: types.UPDATE_LETTER_SUCCESS, letter}
}
