import {combineReducers} from 'redux';
import letters from './letterReducer';

const rootReducer = combineReducers({
  letters
});

export default rootReducer;
