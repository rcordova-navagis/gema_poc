import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMON_MAP_LOADED,
} from './constants';

export function mapLoaded(flag) {
  return {
    isMapLoaded: flag,
    type: COMMON_MAP_LOADED,
  };
}

export function useMapLoaded() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(mapLoaded(...params)), [dispatch]);
  return { mapLoaded: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_MAP_LOADED:
      return {
        isMapLoaded: action.isMapLoaded,
        ...state,
      };

    default:
      return state;
  }
}
