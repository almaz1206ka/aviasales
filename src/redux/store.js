import { combineReducers, createStore, applyMiddleware } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import appReducer from './appReducer';

const rootReducer = combineReducers({
    app: appReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
