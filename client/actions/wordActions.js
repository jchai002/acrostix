import * as types from './actionTypes.js'

// thunk
export function createWords(numberOfWords) {
  return function(dispatch) {
    dispatch(createWordsSuccess(numberOfWords));
  }
}

export function createWordsSuccess(numberOfWords) {
  return {type: types.CREATE_WORDS_SUCCESS, numberOfWords}
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

export function updateClue(clue) {
  return function(dispatch) {
    dispatch(updateClueSuccess(clue));
  }
}

export function updateClueSuccess(clue) {
  return {type: types.UPDATE_CLUE, clue}
}
