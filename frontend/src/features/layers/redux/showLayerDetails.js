import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LAYERS_SHOW_LAYER_DETAILS,
} from './constants';

export function showLayerDetails(visible=false, data= null) {
  return {
    type: LAYERS_SHOW_LAYER_DETAILS,
    visible: visible,
    data: data,
  };
}

export function useShowLayerDetails() {
  const dispatch = useDispatch();
  const isLayerDetailsVisible = useSelector(state => state.layers.isLayerDetailsVisible);
  const layerDetailsData = useSelector(state => state.layers.layerDetailsData);
  const boundAction = useCallback((...params) => dispatch(showLayerDetails(...params)), [dispatch]);
  return { isLayerDetailsVisible, layerDetailsData, showLayerDetails: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case LAYERS_SHOW_LAYER_DETAILS:
      return {
        ...state,
        isLayerDetailsVisible: action.visible,
        layerDetailsData: action.data,
      };

    default:
      return state;
  }
}
