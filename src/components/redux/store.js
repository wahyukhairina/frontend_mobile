import AsyncStorage from '@react-native-community/async-storage'
import {createStore, applyMiddleware, compose} from 'redux';
// import logger from 'redux-logger';
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware';
// import {composeWithDevTools} from 'redux-devtools-extension';
import { persistStore, persistReducer} from 'redux-persist'

import reducers from './reducers';

const persistConfig = {
  // Root
  key: 'auth',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [
    'auth',
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const logger = createLogger({})
const store = createStore(
  persistedReducer,
    applyMiddleware(
      logger,
      promiseMiddleware
    ),
);

let persistor = persistStore(store);

export {
  store,
  persistor,
};


// const store = createStore(
//   reducers,
//   composeWithDevTools(applyMiddleware(logger, promiseMiddleware)),
// );

