import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from './history';
import configReducer from '../features/config/redux/reducer';
import homeReducer from '../features/home/redux/reducer';
import commonReducer from '../features/common/redux/reducer';
import authenticationReducer from '../features/authentication/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage them.

const reducerMap = {
  router: connectRouter(history),
  config: configReducer,
  home: homeReducer,
  common: commonReducer,
  authentication: authenticationReducer,
};

export default combineReducers(reducerMap);
