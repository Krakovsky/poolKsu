import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

import rootReducer from './modules';

const configureStore = (reducers = {}, preloadedState = {}, middlewares = []) => createStore(
  combineReducers({
    ...rootReducer,
    ...reducers,
  }),
  preloadedState,
  compose(
    applyMiddleware(
      ...middlewares,
      thunk,
      reduxLogger,
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default configureStore;
