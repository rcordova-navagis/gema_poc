import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  CONFIG_SWITCH_MAP_DRIVER,
} from './constants';

export function switchMapDriver(driver) {
  return {
    type: CONFIG_SWITCH_MAP_DRIVER,
    mapDriver: driver,
  };
}

export function useSwitchMapDriver() {
  const dispatch = useDispatch();
  const boundAction = useCallback((driver) => dispatch(switchMapDriver(driver)), [dispatch]);
  return { switchMapDriver: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case CONFIG_SWITCH_MAP_DRIVER:
      return {
        ...state,
        MAP_DRIVER: action.mapDriver,
      };

    default:
      return state;
  }
}
