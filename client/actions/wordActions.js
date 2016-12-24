import * as types from './actionTypes.js'
import { Puzzles } from '../../collections/puzzles';

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

export function loadWordsFromDB(puzzleId) {
  return function(dispatch) {
    var puzzle = Puzzles.findOne(puzzleId);
    console.log(puzzle.words)
    dispatch(loadWordsFromDBSuccess(puzzle.words));
  }
}

export function loadWordsFromDBSuccess(words) {
  return {type: types.LOAD_WORDS_FROM_DB_SUCCESSS, words}
}
