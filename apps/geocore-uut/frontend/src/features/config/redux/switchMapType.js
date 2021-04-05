import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  CONFIG_SWITCH_MAP_TYPE,
} from './constants';

export function switchMapType(type) {
  return {
    type: CONFIG_SWITCH_MAP_TYPE,
    mapType: type,
  };
}

export function useSwitchMapType() {
  const dispatch = useDispatch();
  const boundAction = useCallback((mapType) => dispatch(switchMapType(mapType)), [dispatch]);
  return { switchMapType: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case CONFIG_SWITCH_MAP_TYPE:
      return {
        ...state,
        MAP_TYPE: action.mapType,
      };

    default:
      return state;
  }
}
