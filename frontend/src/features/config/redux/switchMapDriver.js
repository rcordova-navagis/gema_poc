import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  CONFIG_SWITCH_MAP_DRIVER,
  GMAP_DRIVER,
  MAPBOX_DRIVER
} from './constants';

export function switchMapDriver() {
  return {
    type: CONFIG_SWITCH_MAP_DRIVER,
  };
}

export function useSwitchMapDriver() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(switchMapDriver(...params)), [dispatch]);
  return { switchMapDriver: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case CONFIG_SWITCH_MAP_DRIVER:
      return {
        ...state,
        MAP_DRIVER: state.MAP_DRIVER === GMAP_DRIVER ? MAPBOX_DRIVER : GMAP_DRIVER,
      };

    default:
      return state;
  }
}
