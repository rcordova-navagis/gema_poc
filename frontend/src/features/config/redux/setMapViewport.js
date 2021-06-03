import { useCallback } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  CONFIG_SET_MAP_VIEWPORT,
} from './constants';


export function setMapViewport(viewport) {
  return {
    type: CONFIG_SET_MAP_VIEWPORT,
    mapViewport: viewport,
  };
}

export function useSetMapViewport() {
  const dispatch = useDispatch();
  const mapViewport = useSelector(state => state.config.mapViewport);
  const boundAction = useCallback((viewport) => dispatch(setMapViewport(viewport)), [dispatch]);
  return { setMapViewport: boundAction, mapViewport };
}

export function reducer(state, action) {
  switch (action.type) {
    case CONFIG_SET_MAP_VIEWPORT:
      return {
        ...state,
        mapViewport: action.mapViewport,
      };

    default:
      return state;
  }
}
