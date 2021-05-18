import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMON_TOGGLE_MAP_LAYERS,
} from './constants';

export function toggleMapLayers(checkedLayers) {
  return {
    type: COMMON_TOGGLE_MAP_LAYERS,
    checkedLayers: checkedLayers,
  };
}

export function useToggleMapLayers() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(toggleMapLayers(...params)), [dispatch]);
  return { toggleMapLayers: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_TOGGLE_MAP_LAYERS:
      return {
        ...state,
        checkedLayers: action.checkedLayers
      };

    default:
      return state;
  }
}
