import * as types from './acttionTypes.js'

export function addLetter(letter) {
  return {type: types.ADD_LETTER, letter}
}
