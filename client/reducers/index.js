import {combineReducers} from 'redux';
import grid from './gridReducer';
import words from './wordReducer';

const appReducer = combineReducers({
  grid,
  words
})

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_STORE') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;
