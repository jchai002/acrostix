import * as types from './actionTypes.js'

// thunk
export function createWord(letter) {
  return function(dispatch) {
    dispatch(createWordSuccess(letter));
  }
}

export function createWordSuccess(letter) {
  return {type: types.CREATE_WORD_SUCCESS, letter}
}

export function addLetterToWord(letter) {
  return function(dispatch) {
    dispatch(addLetterToWordSuccess(letter));
  }
}

export function addLetterToWordSuccess(letter) {
  return {type: types.ADD_LETTER_TO_WORD_SUCCESS, letter}
}

export function removeLetterFromWord(letter) {
  return function(dispatch) {
    dispatch(removeLetterFromWordSuccess(letter));
  }
}

export function removeLetterFromWordSuccess(letter) {
  return {type: types.REMOVE_LETTER_FROM_WORD_SUCCESS, letter}
}
