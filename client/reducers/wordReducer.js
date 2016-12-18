import * as types from '../actions/actionTypes.js'
import initialState from './initialState';
import Alphabet from "../constants/alphabet";

export default function wordReducer(state = initialState.words,action) {
  switch (action.type) {
    case types.CREATE_WORDS_SUCCESS:
    var words = {}
    for (var i = 0;i < action.numberOfWords; i++){
      words[Alphabet[i]] = {letters:[],clue:''}
    }
    return words
    case types.ADD_LETTER_TO_WORD_SUCCESS:
    var wordId = action.letter.wordId;
    var stateClone = JSON.parse(JSON.stringify(state));
    stateClone[wordId].letters.push(action.letter);
    return stateClone
    case types.REMOVE_LETTER_FROM_WORD_SUCCESS:
    var wordId = action.letter.wordId;
    var stateClone = JSON.parse(JSON.stringify(state));
    stateClone[wordId].letters.pop();
    return stateClone
    case types.UPDATE_CLUE:
    var wordId = action.clue.wordId;
    var stateClone = JSON.parse(JSON.stringify(state));
      stateClone[wordId].clue = action.clue.text;
    return stateClone
    default:
    return state
  }
}
