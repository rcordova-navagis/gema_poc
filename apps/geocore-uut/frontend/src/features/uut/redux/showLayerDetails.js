import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  UUT_SHOW_LAYER_DETAILS,
} from './constants';

export function showLayerDetails(layerId) {
  return {
    type: UUT_SHOW_LAYER_DETAILS,
    layerId: layerId,
  };
}

export function useShowLayerDetails() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(showLayerDetails(...params)), [dispatch]);
  return { showLayerDetails: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case UUT_SHOW_LAYER_DETAILS:
      return {
        ...state,
        layerIdDetailsToShow: action.layerId,
      };

    default:
      return state;
  }
}
