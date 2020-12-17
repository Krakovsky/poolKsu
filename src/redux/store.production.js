import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './modules';

const configureStore = (reducers = {}, preloadedState = {}, middlewares = []) => createStore(
  combineReducers({
    ...rootReducer,
    ...reducers,
  }),
  preloadedState,
  applyMiddleware(...middlewares, thunk),
);

export default configureStore;
