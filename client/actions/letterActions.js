import * as types from './actionTypes.js'

export function addLetter(letter) {
  return {type: types.ADD_LETTER, letter}
}
