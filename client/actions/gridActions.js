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

export function useLetter(letter) {
  return function(dispatch) {
    dispatch(useLetterSuccess(letter));
  }
}

export function useLetterSuccess(letter) {
  return {type: types.USE_LETTER_SUCCESS, letter}
}

export function useLetterFail(letter) {
  return {type: types.USE_LETTER_FAIL, letter}
}

export function restoreLetter(letter) {
  return function(dispatch) {
    dispatch(restoreLetterSuccess(letter));
  }
}

export function restoreLetterSuccess(letter) {
  return {type: types.RESTORE_LETTER_SUCCESS, letter}
}
