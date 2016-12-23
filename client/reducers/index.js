import {combineReducers} from 'redux';
import grid from './gridReducer';
import words from './wordReducer';

const rootReducer = combineReducers({
  grid,
  words
});

export default rootReducer;
