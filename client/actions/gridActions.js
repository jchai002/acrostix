import * as types from './actionTypes.js'

// thunk
export function addLetterToGrid(letter) {
  return function(dispatch) {
    // simply dispatch success event for now. Will check for db call success in futures
    // if api call succeeds, call addLetterToGridSuccess with .then, else use .catch for errors
    dispatch(addLetterToGridSuccess(letter));
  }
}

export function addLetterToGridSuccess(letter) {
  return {type: types.ADD_LETTER_TO_GRID_SUCCESS, letter}
}

export function useGridLetter(letter) {
  return function(dispatch) {
    dispatch(useGridLetterSuccess(letter));
  }
}

export function useGridLetterSuccess(letter) {
  return {type: types.USE_GRID_LETTER_SUCCESS, letter}
}

export function useGridLetterFail(letter) {
  return {type: types.USE_LETTER_FAIL, letter}
}

export function restoreGridLetter(letter) {
  return function(dispatch) {
    dispatch(restoreGridLetterSuccess(letter));
  }
}

export function restoreGridLetterSuccess(letter) {
  return {type: types.RESTORE_GRID_LETTER_SUCCESS, letter}
}
