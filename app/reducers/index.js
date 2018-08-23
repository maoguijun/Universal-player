// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import source from './source';

const rootReducer = combineReducers({ source, router });

export default rootReducer;
