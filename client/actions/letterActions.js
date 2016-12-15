import * as types from './actionTypes.js'

// thunk
export function createLetter(letter) {
  return function(dispatch) {
    // simply dispatch success event for now. Will check for db call success in futures
    // if api call succeeds, call createLetterSuccess with .then, else use .catch for errors
    dispatch(createLetterSuccess(letter));
  }
}

export function createLetterSuccess(letter) {
  return {type: types.CREATE_LETTER_SUCCESS, letter}
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
