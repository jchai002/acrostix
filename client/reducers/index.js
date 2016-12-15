import {combineReducers} from 'redux';
import letters from './letterReducer';
import words from './wordReducer';

const rootReducer = combineReducers({
  letters,
  words
});

export default rootReducer;
