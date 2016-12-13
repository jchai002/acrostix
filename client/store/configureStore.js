import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import invariant from 'redux-immutable-state-invariant'

export defualt function configureStore(initialState) {
  rootReducer,
  initialState,
  applyMiddleware(invariant);
}
