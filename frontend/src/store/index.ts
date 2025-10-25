import { configureStore, combineReducers, Middleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import Config from "@/config";
import * as app from 'app.json'

// Root reducer
const rootReducer = combineReducers({});

// Persisted reducer
const persistedReducer = persistReducer(rootReducer);

// Optimized error handling middleware
const errorHandlingMiddleware: Middleware = () => next => action => {
  try {
    return next(action);
  } catch (error) {
    if (__DEV__) {
      console.error('Redux Error:', error);
    }
    throw error;
  }
};

// Logger configuration (only in DEV)
const logger = __DEV__
  ? createLogger({
      collapsed: true,
      duration: true,
      timestamp: true, // Enable timestamp for better debugging
      logErrors: true,
      diff: true, // Enable diff to see state changes
      predicate: () => __DEV__, // Double check DEV mode
    })
  : null;

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: __DEV__ ? { warnAfter: 128 } : false,
    })
      .concat(errorHandlingMiddleware);

    // Add logger only in development
    if (__DEV__ && logger) {
      return middleware.concat(logger);
    }

    return middleware;
  },
  devTools: __DEV__ && {
    name: app.expo.name,
    trace: false, // Disable trace in production
    traceLimit: 25,
    maxAge: 50, // Limit action history
  },
});

// Create persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type PersistedRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
